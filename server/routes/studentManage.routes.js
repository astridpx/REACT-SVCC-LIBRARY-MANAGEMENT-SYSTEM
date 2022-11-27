const router = require("express").Router();
const bcrypt = require("bcrypt");
const db = require("../config/config");

// SALT ROUNDS
const salt = 10;

// GET ALL STUDENTS LIST
router.get("/", async (req, res) => {
  db.query("SELECT * FROM student_acc WHERE role='student'", (err, result) => {
    if (err) {
      res.status(409).send({ message: "SOMETHING WENT WRONG " + err });
    } else {
      res.json(result);
    }
  });
});

// GET ALL APPLICANTS
router.get("/applicants", async (req, res) => {
  db.query(
    "SELECT * FROM student_acc WHERE role='applicants'",
    (err, result) => {
      if (err) {
        res.status(409).send({ message: "SOMETHING WENT WRONG " + err });
      } else {
        res.json(result);
      }
    }
  );
});

// ACCOUNT APPLICANT ACCEPT
router.put("/accept/:id", async (req, res) => {
  db.query(
    "SELECT * FROM student_acc WHERE STUD_ID=?",
    [req.params.id],
    (err, results) => {
      db.query(
        "UPDATE student_acc SET ? WHERE STUD_ID = ?",
        [
          {
            name: results[0].name,
            stud_no: results[0].stud_no,
            course: results[0].course,
            section: results[0].section,
            email: results[0].email,
            password: results[0].password,
            role: "student",
          },
          req.params.id,
        ],
        (err, result) => {
          if (err) {
            res.status(409).send({ message: "SOMETHING WENT WRONG " + err });
          } else {
            res.status(200).send({
              message: "USER ACCEPTED.",
            });
          }
        }
      );
    }
  );
});

// REGISTER
router.post("/register", async (req, res) => {
  const name = req.body.name;
  const studNo = req.body.stud_no;
  const section = req.body.section;
  const course = req.body.course;
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "SELECT * FROM student_acc WHERE stud_no=?",
    [studNo],
    (err, exist) => {
      // CHECK IF THE STUDENT NO IS ALREADY EXIST
      if (exist.length > 0) {
        res.status(409).send({
          message:
            "The Student ID is already registered. Make sure you use your own ID.",
        });
      } else {
        db.query(
          "SELECT * FROM student_acc WHERE email=?",
          [email],
          (err, exists) => {
            // CHECK IF THE EMAIL IS ALREADY EXIST
            if (exists.length > 0) {
              res.status(409).send({
                message: "Email is already registerd. Try to use other email.",
              });
            } else {
              // HASH PASSWORD
              bcrypt.hash(password, salt, (err, hashPassword) => {
                if (err) throw err;

                db.query(
                  "INSERT INTO student_acc (name, stud_no, section, email, password) VALUES(?, ?, ?, ?, ?)",
                  [name, studNo, section, email, hashPassword],
                  (err, result) => {
                    if (err) {
                      res
                        .status(409)
                        .send({ message: "SOMETHING WENT WRONG " + err });
                    } else {
                      res.status(200).send({
                        message:
                          "User Registered Successfully. Please wait for the admin confirmation.",
                      });
                    }
                  }
                );
              });
            }
          }
        );
      }
    }
  );
});

// STUDENT INFORMATION UPDATE
router.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const studNo = req.body.stud_no;
  const section = req.body.section;
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "SELECT * FROM student_acc WHERE stud_no=?",
    [studNo],
    (err, exist) => {
      // IF THE STUD NO REQUEST IS EXIST
      if (exist.length > 0) {
        // IF THE STUD NO MATCH WITH THE EXIST STUD NO AND MATCH WITH THE ID
        if (exist[0].stud_no == studNo && exist[0].STUD_ID == id) {
          // CHECK  THE EMAIL
          db.query(
            "SELECT * FROM student_acc WHERE email=?",
            [email],
            (err, exists) => {
              if (exists.length > 0) {
                // CHECK IF THE EMAIL IS MATCH WITH THE ID PARAMS
                if (exists[0].email == email && exists[0].STUD_ID == id) {
                  // HASH PASSWORD
                  bcrypt.hash(password, salt, (err, hashPassword) => {
                    if (err) throw err;
                    db.query(
                      "UPDATE student_acc SET ? WHERE STUD_ID=?",
                      [
                        {
                          name: name,
                          stud_no: studNo,
                          section: section,
                          email: email,
                          password: hashPassword,
                        },
                        id,
                      ],
                      (err, result) => {
                        if (err) {
                          res
                            .status(409)
                            .send({ message: "SOMETHING WENT WRONG " + err });
                        } else {
                          res.status(200).send({
                            message: "USER UPDATED SUCCESS.",
                          });
                        }
                      }
                    );
                  });
                  // IF THE EMAIL EXIST BUT NOT MATCH WITH THE ID PARAMS THIS MEANS THE EMAIL IS USE BY ANOTHER PERSON
                } else {
                  res.status(409).send({ message: "EMAIL IS ALREADY TAKEN" });
                }
                // IF THE EMAIL DOESNT EXIST THIS MEANS CAN UPDATE
              } else {
                // HASH PASSWORD
                bcrypt.hash(password, salt, (err, hashPassword) => {
                  if (err) throw err;
                  db.query(
                    "UPDATE student_acc SET ? WHERE STUD_ID=?",
                    [
                      {
                        name: name,
                        stud_no: studNo,
                        section: section,
                        email: email,
                        password: hashPassword,
                      },
                      id,
                    ],
                    (err, result) => {
                      if (err) {
                        res
                          .status(409)
                          .send({ message: "SOMETHING WENT WRONG " + err });
                      } else {
                        res.status(200).send({
                          message: "USER UPDATED SUCCESS.",
                        });
                      }
                    }
                  );
                });
              }
            }
          );
          // IF THE STUD ID IS EXIST AND NOT MATCH WITH ID PARAMS
        } else {
          res.status(409).send({ message: "ID IS ALREADY TAKEN." });
        }
      } else {
        // CHECK THE EMAIL IF THE STUD NO IS DOESNT EXIST
        db.query(
          "SELECT * FROM student_acc WHERE email=?",
          [email],
          (err, exists) => {
            if (exists.length > 0) {
              // CHECK IF THE EMAIL IS MATCH WITH THE ID PARAMS IF TRUE YOU CAN UODATE
              if (exists[0].email == email && exists[0].STUD_ID == id) {
                // HASH PASSWORD
                bcrypt.hash(password, salt, (err, hashPassword) => {
                  if (err) throw err;
                  db.query(
                    "UPDATE student_acc SET ? WHERE STUD_ID=?",
                    [
                      {
                        name: name,
                        stud_no: studNo,
                        section: section,
                        email: email,
                        password: hashPassword,
                      },
                      id,
                    ],
                    (err, result) => {
                      if (err) {
                        res
                          .status(409)
                          .send({ message: "SOMETHING WENT WRONG " + err });
                      } else {
                        res.status(200).send({
                          message: "USER UPDATED SUCCESS.",
                        });
                      }
                    }
                  );
                });
                // IF THE EMAIL EXIST BUT NOT MATCH WITH THE ID PARAMS THIS MEANS THE EMAIL IS USE BY ANOTHER PERSON
              } else {
                res.status(409).send({ message: "EMAIL  IS ALREADY TAKEN" });
              }
              // IF THE EMAIL DOESNT EXIST THIS MEANS YOU CAN UPDATE
            } else {
              // HASH PASSWORD
              bcrypt.hash(password, salt, (err, hashPassword) => {
                if (err) throw err;
                db.query(
                  "UPDATE student_acc SET ? WHERE STUD_ID=?",
                  [
                    {
                      name: name,
                      stud_no: studNo,
                      section: section,
                      email: email,
                      password: hashPassword,
                    },
                    id,
                  ],
                  (err, result) => {
                    if (err) {
                      res
                        .status(409)
                        .send({ message: "SOMETHING WENT WRONG " + err });
                    } else {
                      res.status(200).send({
                        message: "USER UPDATED SUCCESS.",
                      });
                    }
                  }
                );
              });
            }
          }
        );
      }
    }
  );
});

// DELETE
router.delete("/delete/:id", async (req, res) => {
  db.query(
    "DELETE FROM student_acc WHERE STUD_ID=?",
    [req.params.id],
    (err, result) => {
      if (result) {
        res.status(201).send({ message: "USER ACCOUNT DELETED SUCCESSFULLY." });
      }
    }
  );
});

module.exports = router;

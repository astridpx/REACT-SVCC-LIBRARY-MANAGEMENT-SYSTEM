const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/config");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
require("dotenv").config();

const salt = 10;

// GET ADMIN INFO
router.get("/", async (req, res) => {
  db.query("SELECT * FROM admin WHERE ADMIN_ID=?", [1], (err, result) => {
    if (err) {
      res.status(409).send({ message: "SOMETHING WENT WRONG " + err });
    } else {
      res.json(result);
    }
  });
});

// ADMIN LOGIN
router.post("/adminLogin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM admin WHERE email=?", [email], (err, result) => {
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password).then((match) => {
        if (!match) {
          res.status(409).send({ message: "PASSWORD IS INCORRECT." });
        } else {
          const token = jwt.sign(
            { id: result[0].id },
            process.env.JWTPRIVATEKEY,
            {
              expiresIn: "2d",
            }
          );
          req.session.user = result;

          // console.log(req.session.user);
          res.status(200).send({ message: "LOGIN SUCCESS.", token });
        }
      });
    } else {
      res.status(409).send({ message: "INVALID EMAIL." });
    }
  });
});

// UPDATE
router.put("/update-admin/:id", async (req, res) => {
  const adminId = req.params.id;
  const schoolId = req.body.schoolId;
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const course = req.body.course;
  const section = req.body.section;

  bcrypt.hash(password, salt, (err, hashPassword) => {
    if (err) throw err;
    db.query(
      "UPDATE admin SET ? WHERE ADMIN_ID = ?",
      [
        {
          school_ID: schoolId,
          name: name,
          section: section,
          course: course,
          email: email,
          password: hashPassword,
        },
        adminId,
      ],
      (err, result) => {
        if (err) {
          res.status(400).send({ message: " Something went wrong." });
        } else {
          res.status(200).send({ message: "Information updated success." });
        }
      }
    );
  });
});
module.exports = router;

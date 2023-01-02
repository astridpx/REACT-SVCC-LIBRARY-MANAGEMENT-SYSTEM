const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const db = require("../config/config");
require("dotenv").config();

router.post("/", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  await db.query(
    "SELECT * FROM student_acc WHERE email=?",
    [email],
    (err, result) => {
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password).then((match) => {
          if (!match) {
            res.status(409).send({ message: "PASSWORD IS INCORRECT." });
          } else {
            if (result[0].role === "student") {
              const token = jwt.sign(
                { id: result[0].id },
                process.env.JWTPRIVATEKEY,
                {
                  expiresIn: "10h",
                }
              );
              const role = result[0].role;
              const id = result[0].STUD_ID;
              res
                .status(200)
                .send({ message: "LOGIN SUCCESS.", token, role, id });
            } else {
              res.status(409).send({
                message:
                  "Your Account is not confirmed yet. Pls, Contact Your admin to make this account login.",
              });
            }
          }
        });

        // console.log(result[0].email);
        // if(result[0].email == email )
      } else {
        res.status(409).send({ message: "NO EMAIL FOUND." });
      }
    }
  );
});

module.exports = router;

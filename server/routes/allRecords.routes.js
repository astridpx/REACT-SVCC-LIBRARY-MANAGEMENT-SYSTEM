const router = require("express").Router();
const db = require("../config/config");
const { authStudent } = require("../middlewares");
const bcrypt = require("bcrypt");

// authStudent(["admin", "student"]),
// GET ISSUE RECORDS
router.get("/", async (req, res) => {
  db.query(
    // "SELECT * FROM issue_book ib LEFT JOIN booklist bk ON bk.BOOK_ID = ib.BOOK_ID LEFT JOIN student_acc sa ON sa.STUD_ID = ib.STUD_ID;",
    "SELECT ib.ISSUE_ID, ib.issue_date,ib.return_date, bk.BOOK_ID, bk.isbn, bk.title, sa.STUD_ID, sa.stud_no, sa.name, sa.email FROM issue_book ib LEFT JOIN booklist bk ON bk.BOOK_ID = ib.BOOK_ID LEFT JOIN student_acc sa ON sa.STUD_ID = ib.STUD_ID;",
    (err, result) => {
      res.json(result);
    }
  );
});

// DELETE RECORD
router.delete("/delete/:id", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM admin WHERE email=?", [email], (err, result) => {
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password).then((match) => {
        if (!match) {
          res.status(409).send({ message: "Invalid Password." });
        } else {
          db.query(
            "DELETE FROM issue_book WHERE issue_book.ISSUE_ID = ?",
            [req.params.id],
            (err, result) => {
              if (result) {
                res
                  .status(201)
                  .send({ message: "RECORD DELETED SUCCESSFULLY." });
              }
            }
          );
        }
      });
    } else {
      res.status(409).send({ message: "Email Doesn't Exist." });
    }
  });
});

// RETURN DELETE
router.delete("/return/:id", async (req, res) => {
  const isbn = req.body.isbn;
  db.query(
    "DELETE FROM issue_book WHERE issue_book.ISSUE_ID = ?",
    [req.params.id],
    (err, result) => {
      if (result) {
        res.status(201).send({ message: "RECORD DELETED SUCCESSFULLY." });
      }
    }
  );
});

module.exports = router;

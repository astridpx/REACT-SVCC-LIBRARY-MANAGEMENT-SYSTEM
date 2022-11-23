const router = require("express").Router();
const db = require("../config/config");
const { authStudent } = require("../middlewares");

// authStudent(["admin", "student"]),
// GET ISSUE RECORDS
router.get("/", async (req, res) => {
  db.query(
    // "SELECT * FROM issue_book ib LEFT JOIN booklist bk ON bk.BOOK_ID = ib.BOOK_ID LEFT JOIN student_acc sa ON sa.STUD_ID = ib.STUD_ID;",
    "SELECT ib.ISSUE_ID, bk.BOOK_ID, bk.isbn, bk.title, sa.STUD_ID, sa.stud_no, sa.name, sa.email FROM issue_book ib LEFT JOIN booklist bk ON bk.BOOK_ID = ib.BOOK_ID LEFT JOIN student_acc sa ON sa.STUD_ID = ib.STUD_ID;",
    (err, result) => {
      res.json(result);
    }
  );
});

// DELETE
router.delete("/delete/:id", async (req, res) => {
  await db.query(
    "DELETE FROM issue_book WHERE issue_book.ISSUE_ID = ?",
    [req.params.id],
    (err, result) => {
      if (result) {
        res.status(201).send({ message: "BOOK DELETED SUCCESSFULLY." });
      }
    }
  );
});

module.exports = router;

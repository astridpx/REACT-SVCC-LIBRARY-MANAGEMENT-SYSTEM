const router = require("express").Router();
const db = require("../config/config");

router.get("/myRecords/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT ib.ISSUE_ID, ib.STUD_ID AS Stud_Id_Issue, ib.issue_date, ib.return_date, bk.BOOK_ID, bk.isbn, bk.title, sa.STUD_ID, sa.stud_no, sa.name, sa.email FROM issue_book ib LEFT JOIN booklist bk ON bk.BOOK_ID = ib.BOOK_ID LEFT JOIN student_acc sa ON sa.STUD_ID = ib.STUD_ID  WHERE ib.STUD_ID = ? ",
    [id],
    (err, result) => {
      if (result) {
        res.json(result);
      } else {
        console.log(err);
      }
    }
  );
});

router.get("/details/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT * FROM student_acc WHERE STUD_ID = ?",
    [id],
    (err, result) => {
      if (result) {
        res.json(result);
      }
    }
  );
});

module.exports = router;

const router = require("express").Router();
const db = require("../config/config");

// GET BOOK LIST
router.get("/", async (req, res) => {
  db.query("SELECT * FROM booklist", (err, result) => {
    if (err) {
      res.status(409).send({ message: "SOMETHING WENT WRONG " + err });
    } else {
      res.json(result);
    }
  });
});

// ADD BOOK
router.post("/addBook", async (req, res) => {
  const isbn = req.body.isbn;
  const title = req.body.title;
  const author = req.body.author;
  const published = req.body.published;

  await db.query(
    "SELECT * FROM booklist WHERE isbn=?",
    [isbn],
    (err, exist) => {
      if (exist.length > 0) {
        res.status(409).send({ message: "ISBN is already EXIST." });
        // console.log(exist[0].published_date);
      } else {
        // insert to the DB
        db.query(
          "INSERT INTO booklist (isbn, title, author, published_date) VALUES(? , ? , ? , ?)",
          [isbn, title, author, published],
          (err, result) => {
            if (err) {
              res.status(409).send({ message: "SOMETHING WENT WRONG " + err });
            } else {
              res.status(200).send({ message: "NEW BOOK SUCCESSFULLY ADDED." });
            }
          }
        );
      }
    }
  );
});

// UPDATE BOOK
router.put("/updateBook/:id", async (req, res) => {
  const id = req.params.id;
  const isbn = req.body.isbn;
  const title = req.body.title;
  const author = req.body.author;
  const published = req.body.published;

  db.query("SELECT * FROM booklist WHERE  isbn=? ", [isbn], (err, exist) => {
    if (exist.length > 0) {
      // IF THE EXIST ISBN IS MATCH WITH THE EXIST ID IS MATCH THIS MEANS CAN UPDATE
      if (exist[0].isbn == isbn && exist[0].BOOK_ID == id) {
        db.query(
          "UPDATE booklist SET ? WHERE BOOK_ID = ?",
          [
            {
              isbn: isbn,
              title: title,
              author: author,
              published_date: published,
            },
            req.params.id,
          ],
          (err, result) => {
            if (err) {
              res.status(400).send({ message: "FATAL ERROR " + err });
            } else {
              res.status(201).send({ message: "BOOK RECORD UPDATE SUCCESS." });
            }
          }
        );
        // IF THE ISBN FOUND AND THE ID NOT MATCH TO THE PARAMS THIS MEAN CANT UPDATE
      } else {
        res.status(409).send({ message: "ISBN IS ALREADY EXIST." });
      }
      // IF THE ISBN NOT FOUND THIS MEANS IT DOESNT EXIST
    } else {
      db.query(
        "UPDATE booklist SET ? WHERE BOOK_ID = ?",
        [
          {
            isbn: isbn,
            title: title,
            author: author,
            published_date: published,
          },
          req.params.id,
        ],
        (err, result) => {
          if (err) {
            res.status(400).send({ message: "FATAL ERROR " + err });
          } else {
            res.status(201).send({ message: "BOOK RECORD UPDATE SUCCESS." });
          }
        }
      );
    }
  });
});

// DELETE BOOK
router.delete("/deleteBook/:id", async (req, res) => {
  db.query(
    // "DELETE FROM booklist WHERE booklist.BOOK_ID = ?",
    "DELETE FROM booklist WHERE booklist.BOOK_ID = ?",
    [req.params.id],
    (err, result) => {
      if (result) {
        res.status(201).send({ message: "BOOK DELETED SUCCESSFULLY." });
      }
    }
  );
});

// AVAILABLE BOOK
router.get("/availableBooks", async (req, res) => {
  db.query(
    "SELECT * FROM booklist WHERE BOOK_ID NOT IN (SELECT BOOK_ID FROM issue_book) ORDER BY title",
    (err, result) => {
      if (err) {
        res.status(409).send({ message: "SOMETHING WENT WRONG " + err });
      } else {
        res.json(result);
      }
    }
  );
});

module.exports = router;

const router = require("express").Router();
const db = require("../config/config");

// PROFILE IMAGES
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(null, "./Images");
    cb(null, "./public/Images/");
  },
  filename: (req, file, cb) => {
    // RENAME IMAGE FILE NAME
    return cb(null, Date.now() + path.extname(file.originalname));
  },
});

// IMAGE FILTER
const isImage = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(null, Error("Only image is allowed"));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: isImage,
});

router.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// ADMIN PROFILE IMAGE UPLOAD
router.put("/:id", upload.single("image"), (req, res) => {
  const image = "http://localhost:5000/Images/" + req.file.filename;
  const id = req.params.id;

  if (!/\.(jpg|png|jpeg)/i.test(req.file.originalname)) {
    res
      .status(409)
      .send({ message: "Only image files (jpg, jpeg, png) are allowed!" });
  } else {
    const sqlInsert = "UPDATE admin SET `image` = ? WHERE ADMIN_ID = ?";
    db.query(sqlInsert, [image, id], (err, result) => {
      if (err) {
        res.status(409).send({ message: "SOMETHING WENT WRONG " + err });
      } else {
        res.status(200).send({
          data: result,
          message: "Profile image uploaded.",
        });
      }
    });
  }
});

// STUDENT PROFILE IMAGE UPLOAD
router.put("/student/:id", upload.single("image"), (req, res) => {
  const image = req.file.filename;
  const id = req.params.id;

  if (!/\.(jpg|png|jpeg)/i.test(req.file.originalname)) {
    res
      .status(409)
      .send({ message: "Only image files (jpg, jpeg, png) are allowed!" });
  } else {
    const sqlInsert = "UPDATE student_acc SET `image` = ? WHERE STUD_ID = ?";
    db.query(sqlInsert, [image, id], (err, result) => {
      if (err) {
        res.status(409).send({ message: "SOMETHING WENT WRONG " + err });
      } else {
        res.status(200).send({
          data: result,
          message: "Profile image uploaded.",
        });
      }
    });
  }
});

module.exports = router;

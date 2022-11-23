const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const cookie = require("cookie-parser");

// router
const bookRoutes = require("./routes/book.routes");
const studentRoutes = require("./routes/student.routes");
const studentLoginRoutes = require("./routes/studentLogin.routes");
const issueBookRouter = require("./routes/issueBook.routes");
const allRecordsRouter = require("./routes/allRecords.routes");
// db config
const db = require("./config/config");
// const cookieParser = require("cookie-parser");

// middleware
app.use(express.json());
app.use(cors());
// app.use(cookieParser());

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is Up and Running at port ${port}`);
});

db.connect((err) => {
  if (!err) {
    console.log("MySQL connection stablished...");
  } else {
    console.log(err);
  }
});

app.use("/books", bookRoutes);
app.use("/students", studentRoutes);
app.use("/students/login", studentLoginRoutes);
app.use("/issueBook", issueBookRouter);
app.use("/allRecords", allRecordsRouter);

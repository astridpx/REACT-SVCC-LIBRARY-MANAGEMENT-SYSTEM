const express = require("express");
const app = express();
require("dotenv").config();
const cookie = require("cookie-parser");
const cors = require("cors");

// router
const adminRouter = require("./routes/admin.routes");
const bookRoutes = require("./routes/book.routes");
const studentRoutes = require("./routes/studentManage.routes");
const studentLoginRoutes = require("./routes/studentLogin.routes");
const issueBookRouter = require("./routes/issueBook.routes");
const allRecordsRouter = require("./routes/allRecords.routes");

// db config
const db = require("./config/config");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");

// middleware
app.use(express.json());
// app.use(cors());
app.use(
  cors({
    // origin: "http://localhost:5000/",
    origin: "*",
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    key: "userId",
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

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

app.use("/admin", adminRouter);
app.use("/books", bookRoutes);
app.use("/students", studentRoutes);
app.use("/students/login", studentLoginRoutes);
app.use("/issueBook", issueBookRouter);
app.use("/allRecords", allRecordsRouter);

import { useRef, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar.student";
import Navbar from "../components/Navbar";
import "../Styles/IssueBook.scss";
import { FormatISBN } from "../helpers/isbn.format";
import { FormatStudID } from "../helpers/studID.format";
import axios from "axios";
import Swal from "sweetalert2";
import QRCode from "react-qr-code";
import { QrReader } from "react-qr-reader";

import { useSelector } from "react-redux";

const IssueBook = () => {
  const [isbn, setISBN] = useState("");
  const issueRef = useRef();
  const [title, setTitle] = useState("");
  const [studId, setStudId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [scan, setScan] = useState(false);

  // REDUX
  const nameval = useSelector((state) => state.userAcc.name);
  const emailval = useSelector((state) => state.userAcc.email);
  const studIdVal = useSelector((state) => state.userAcc.accNo);

  const handleISBN = (e) => {
    const formatedISBN = FormatISBN(e.target.value);
    setISBN(formatedISBN);
  };
  const handleStudId = (e) => {
    const formatedStudID = FormatStudID(e.target.value);
    setStudId(formatedStudID);
  };

  useEffect(() => {
    issueRef.current.focus();
  }, []);

  // SWEET ALERT
  const Toast = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  // ISSUE BOOK API INTEGRATION
  const configData = {
    method: "post",
    url: "http://localhost:5000/issueBook/issue",
    data: {
      isbn,
      title,
      studId: studIdVal,
      name: nameval,
      email: emailval,
      issueDate,
      returnDate,
    },
  };
  const HandleSubmit = (e) => {
    e.preventDefault();
    axios(configData)
      .then((result) => {
        Toast.fire({
          icon: "success",
          title: result.data.message,
        }).then(() => window.location.reload(false));
      })
      .catch((err) => {
        console.log(err);
        Toast.fire({
          icon: "error",
          title: err.response.data.message,
        });
        // .then(() => window.location.reload(false));
      });
  };

  const Scanner = (
    <>
      <QrReader
        onResult={(result, error) => {
          if (result) {
            const url = `http://localhost:5000/issueBook/issue/getBook/${result}`;
            axios
              .get(url)
              .then(async (results) => {
                await results.data.map((props) => {
                  setISBN(props.isbn);
                  setTitle(props.title);

                  return true;
                });
              })
              .catch((err) => {
                Toast.fire({
                  icon: "error",
                  title: err.response.data.message,
                });
              });
          }
        }}
        style={{ position: "unset", top: "0" }}
      />
      <div className="boxScanner"></div>
    </>
  );

  return (
    <>
      <Navbar />
      <div className="issue-book-container">
        <div className="nav-side">
          <Sidebar issue="active" />
        </div>
        <div className="form-wrapper">
          <form action="" onSubmit={(e) => HandleSubmit(e)}>
            <div className="issue-field">
              <label htmlFor="isbn">ISBN</label>
              <input
                type="text"
                ref={issueRef}
                id="isbn"
                placeholder="Enter isbn"
                required
                autoComplete="off"
                // onChange={handleISBN}
                // value={isbn}
                value={scan ? isbn : "000-0000-000"}
                maxLength="12"
              />
            </div>
            <div className="issue-field">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                placeholder="Enter title"
                required
                autoComplete="off"
                // value={title}
                value={scan ? title : "Book"}
                // onChange={(e) => setTitle(e.target.value.toUpperCase())}
              />
            </div>
            <div className="issue-field">
              <label htmlFor="studID">Student I.D.</label>
              <input
                type="text"
                id="studID"
                placeholder="Enter stud id"
                required
                autoComplete="off"
                value={studIdVal}
                onChange={(e) => handleStudId(e)}
              />
            </div>
            <div className="issue-field">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter name"
                required
                autoComplete="off"
                value={nameval}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="issue-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                required
                autoComplete="off"
                value={emailval}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="issue-field">
              <label htmlFor="dateIssue">Issue</label>
              <input
                type="date"
                id="dateIssue"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
              />
            </div>
            <div className="issue-field">
              <label htmlFor="dateReturn">Return</label>
              <input
                type="date"
                id="dateReturn"
                required
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </div>
            <button id="btn-issue">Issue</button>
          </form>
          <div className="qr-box">
            <div className="upper-box">
              <div className="img-box">
                {scan ? Scanner : <p>Camera is Off</p>}
              </div>
            </div>
            <div className="bottom-box">
              <button type="button" onClick={() => setScan(true)}>
                Scan
              </button>
              <button onClick={() => window.location.reload(false)}>
                Stop
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IssueBook;

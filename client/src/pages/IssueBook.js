import { useRef, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
// import "../Css/IssueBook.css";
import "../Styles/IssueBook.scss";
import { FormatISBN } from "../helpers/isbn.format";
import { FormatStudID } from "../helpers/studID.format";
import axios from "axios";
// import Qr from "../assets/profile.png";
import QRCode from "react-qr-code";

const IssueBook = () => {
  const [isbn, setISBN] = useState("");
  const issueRef = useRef();
  const [title, setTitle] = useState("");
  const [studId, setStudId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

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

  // ISSUE BOOK API INTEGRATION
  const configData = {
    method: "post",
    url: "http://localhost:5000/issueBook/issue",
    data: {
      isbn,
      title,
      studId,
      name,
      email,
      issueDate,
      returnDate,
    },
  };
  const HandleSubmit = () => {
    // e.prevent.default();
    axios(configData)
      .then((result) => {
        alert(result.data.message);
      })
      .catch((err) => alert(err));
  };
  return (
    <>
      <div className="issue-book-container">
        <div className="nav-side">
          <Sidebar issue="active" />
        </div>
        <div className="form-wrapper">
          <form action="" onSubmit={HandleSubmit}>
            <div className="issue-field">
              <label htmlFor="isbn">ISBN</label>
              <input
                type="text"
                ref={issueRef}
                id="isbn"
                placeholder="Enter isbn"
                autoComplete="off"
                onChange={handleISBN}
                value={isbn}
                maxLength="12"
              />
            </div>
            <div className="issue-field">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                placeholder="Enter title"
                autoComplete="off"
                value={title}
                onChange={(e) => setTitle(e.target.value.toUpperCase())}
              />
            </div>
            <div className="issue-field">
              <label htmlFor="studID">Student I.D.</label>
              <input
                type="text"
                id="studID"
                placeholder="Enter stud id"
                autoComplete="off"
                value={"AY" + studId}
                onChange={(e) => handleStudId(e)}
              />
            </div>
            <div className="issue-field">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter name"
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="issue-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                autoComplete="off"
                value={email}
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
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </div>
            <button id="btn-issue">Issue</button>
          </form>
          <div className="qr-box">
            <div className="upper-box">
              <div className="img-box">
                {/* <img src={Qr} id="qr-img" />
                <p>QR-Code Display Here</p> */}
                {isbn && (
                  <QRCode
                    // title="SVCC"
                    value={isbn}
                    id="qr-img"
                    fgColor={"#000000"}
                    bgColor={"#fff"}
                    // viewBox={`0 0 256 256`}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IssueBook;

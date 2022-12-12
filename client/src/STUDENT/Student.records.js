import React, { useEffect, useState } from "react";
import Sidebar from "../STUDENT/components/Sidebar.student";
import Navbar from "../components/Navbar";
// import "../Styles/Records.scss";
import "./Student-styles/StudentRecord.scss";
import axios from "axios";
// import DateTime from "../components/Clock";

const Records = () => {
  const [recordList, setRecordList] = useState("");
  // const [issueId, setIssueId] = useState("");

  function isDateBeforeToday(date) {
    const checkDate = new Date(date);
    var now = new Date();
    return checkDate < now;
  }

  useEffect(() => {
    let recordCleanup = true;
    const url = `http://localhost:5000/students/myRecords/${localStorage.getItem(
      "id"
    )}`;

    axios.get(url).then((result) => {
      const resultRecord = result.data.map((props) => {
        return (
          <tr
            key={props.ISSUE_ID}
            className={
              isDateBeforeToday(props.return_date) ? "not-return" : null
            }
          >
            <td>{props.isbn}</td>
            <td>{props.title}</td>
            <td className="name-box">{props.name}</td>
            <td className="email-box">{props.email}</td>
            <td>{new Date(props.issue_date).toDateString()}</td>
            <td>{new Date(props.return_date).toDateString()}</td>
          </tr>
        );
      });
      setRecordList(resultRecord);
    });
    return () => {
      recordCleanup = false;
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="student-container">
        <div className="nav-side">
          <Sidebar records="active" />
        </div>
        <div className="table-container">
          <div className="table-wrapper">
            <header>
              <h2> My Records</h2>
            </header>
            <div className="stud-table-section">
              <table>
                <thead>
                  <tr>
                    <th id="bookID">ISBN</th>
                    <th>Book Title</th>
                    <th>Student name</th>
                    <th>Email</th>
                    <th>Issue Date</th>
                    <th>Return Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recordList.length > 0 ? recordList : <h4>No Result</h4>}
                </tbody>
              </table>
            </div>
          </div>
          {/*  */}
        </div>
      </div>
    </>
  );
};

export default Records;

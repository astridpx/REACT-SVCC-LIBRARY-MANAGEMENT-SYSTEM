import React, { useEffect, useState } from "react";
import Profile from "../../assets/profile.png";
import axios from "axios";

export const AccountApplicants = () => {
  const [applicantList, setApplicantList] = useState("");

  useEffect(() => {
    let applicantCleanpUp = true;
    const url = "http://localhost:5000/students/applicants";

    axios.get(url).then((result) => {
      const applicants = result.data.map((props) => {
        return (
          <tr key={props.STUD_ID}>
            <td className="name-box">
              <img src={Profile} alt="" /> {props.name}
            </td>
            <td>{props.stud_no}</td>
            <td>{props.section}</td>
            <td>{props.course}</td>
            <td className="email-box">{props.email}</td>
            <td className="action">
              <button id="accept">Accept</button>
              <button id="reject">Reject</button>
            </td>
          </tr>
        );
      });
      setApplicantList(applicants);
    });
    return () => {
      applicantCleanpUp = false;
    };
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Student name</th>
          <th>Student I.D.</th>
          <th>Section</th>
          <th>Course</th>
          <th>Email</th>
          <th>action</th>
        </tr>
      </thead>
      <tbody>{applicantList.length > 0 ? applicantList : null}</tbody>
    </table>
  );
};

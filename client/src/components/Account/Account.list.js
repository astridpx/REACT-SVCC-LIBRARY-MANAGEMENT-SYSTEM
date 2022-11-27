import React, { useEffect, useState } from "react";
import Profile from "../../assets/profile.png";
import axios from "axios";

export const AccountList = () => {
  const [accountList, setAccountList] = useState("");

  useEffect(() => {
    let accListCleanup = true;
    const url = "http://localhost:5000/students/";

    axios.get(url).then((result) => {
      const acclist = result.data.map((props) => {
        return (
          <tr key={props.STUD_ID}>
            <td className="name-box">
              <img src={Profile} alt="" /> {props.name}
            </td>
            <td>{props.stud_no}</td>
            <td>{props.section}</td>
            <td>{props.section}</td>
            <td className="email-box">{props.email}</td>
            <td className="action">
              <button id="edit">Edit</button>
              <button id="delete">Delete</button>
            </td>
          </tr>
        );
      });
      setAccountList(acclist);
    });

    return () => (accListCleanup = false);
  });
  return (
    <table>
      <thead>
        <tr>
          <th>Student name</th>
          <th>Studend I.D.</th>
          <th>Section</th>
          <th>Course</th>
          <th>Email</th>
          <th>action</th>
        </tr>
      </thead>
      <tbody>
        {accountList.length > 0 ? accountList : <h4>No Member Yet</h4>}
        <tr>
          <td className="name-box">
            <img src={Profile} alt="" /> John Angelo Lante
          </td>
          <td>AY2020-2828</td>
          <td>Astrid</td>
          <td>BSIT</td>
          <td className="email-box">lanteangelo123@gmail.com</td>
          <td className="action">
            <button id="edit">Edit</button>
            <button id="delete">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

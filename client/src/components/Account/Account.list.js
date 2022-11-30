import React, { useEffect, useState } from "react";
import Profile from "../../assets/profile.png";
import axios from "axios";
import Swal from "sweetalert2";

export const AccountList = () => {
  const [accountList, setAccountList] = useState("");
  const [email, setEmail] = useState("john@gmail.com");

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
              {/* <button id="edit">Edit</button> */}
              <button
                id="delete"
                onClick={() => {
                  Swal.fire({
                    title: "Enter Your Password to Confirm Delete",
                    input: "password",
                    icon: "warning",
                    showCancelButton: true,
                    inputPlaceholder: "Enter your password ",
                  }).then((confirmPassword) => {
                    if (confirmPassword.isConfirmed) {
                      const configData = {
                        method: "delete",
                        url: `http://localhost:5000/students/disband/${props.STUD_ID}`,
                        data: {
                          email,
                          password: confirmPassword.value,
                        },
                      };
                      axios(configData)
                        .then((result) => {
                          Toast.fire({
                            icon: "success",
                            title: result.data.message,
                          });
                          // .then(() => window.location.reload(false));
                        })
                        .catch((err) => {
                          if (err) {
                            Toast.fire({
                              icon: "error",
                              showCancelButton: false,
                              title: err.response.data.message,
                            });
                          }
                        });
                    }
                  });
                }}
              >
                Delete
              </button>
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
      </tbody>
    </table>
  );
};

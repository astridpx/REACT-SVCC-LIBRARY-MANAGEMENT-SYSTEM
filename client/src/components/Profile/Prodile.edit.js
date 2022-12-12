// import "../../Css/ProfileEdit.css";
import "./ProfileEdit.scss";
import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FormatStudID } from "../../helpers/studID.format";

export const ProfileEdit = (props) => {
  const [accId, setAccId] = useState("");
  const [name, setName] = useState("");
  const [section, setSection] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // FOCUS INPUT FIELD
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleAccId = (e) => {
    const formatedAccID = FormatStudID(e.target.value);
    setAccId("AY" + formatedAccID);
  };

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

  const HandleSubmit = (e) => {
    e.preventDefault();

    const configData = {
      method: "put",
      url: `http://localhost:5000/admin/update-admin/${props.adminId}`,
      data: {
        schoolId: accId,
        name,
        section,
        course,
        email,
        password,
      },
    };

    // console.log(configData);
    axios(configData)
      .then((result) => {
        Toast.fire({
          icon: "success",
          title: result.data.message,
        });
        // .then(() => formRef.target.reset());
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err.response.data.message,
        });
      });
  };

  return (
    <>
      <form action="" onSubmit={(e) => HandleSubmit(e)}>
        <div className="input-field">
          <p>I.D.</p>
          <input
            type="text"
            ref={inputRef}
            placeholder="Enter stud Id"
            required
            value={accId}
            onChange={(e) => handleAccId(e)}
          />
        </div>
        <div className="input-field">
          <p>Name</p>
          <input
            type="text"
            placeholder="Enter name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-field">
          <p>Role</p>
          <input
            type="text"
            placeholder="Enter name"
            defaultValue={"Admin"}
            readOnly
          />
        </div>
        <div className="input-field">
          <p>Section</p>
          <input
            type="text"
            placeholder="Enter section"
            required
            value={section}
            onChange={(e) => setSection(e.target.value.toUpperCase())}
          />
        </div>
        <div className="input-field">
          <p>Course</p>
          <input
            type="text"
            placeholder="Enter course"
            required
            value={course}
            onChange={(e) => setCourse(e.target.value.toUpperCase())}
          />
        </div>
        <div className="input-field">
          <p>Email</p>
          <input
            type="text"
            placeholder="Enter email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
          />
        </div>
        <div className="input-field">
          <p>Password</p>
          <input
            type="password"
            placeholder="Enter password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="btn-box">
          <button type="submit">Update</button>
        </div>
      </form>
    </>
  );
};

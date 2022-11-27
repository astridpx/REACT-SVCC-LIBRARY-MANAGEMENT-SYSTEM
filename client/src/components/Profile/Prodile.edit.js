// import "../../Css/ProfileEdit.css";
import "./ProfileEdit.scss";
import React, { useRef, useEffect } from "react";

export const ProfileEdit = () => {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <form action="">
        <div className="input-field">
          <p>I.D.</p>
          <input type="text" ref={inputRef} placeholder="Enter stud Id" />
        </div>
        <div className="input-field">
          <p>Name</p>
          <input type="text" placeholder="Enter name" />
        </div>
        <div className="input-field">
          <p>Section</p>
          <input type="text" placeholder="Enter section" />
        </div>
        <div className="input-field">
          <p>Course</p>
          <input type="text" placeholder="Enter course" />
        </div>
        <div className="input-field">
          <p>Email</p>
          <input type="text" placeholder="Enter email" />
        </div>
        <div className="input-field">
          <p>Password</p>
          <input type="password" placeholder="Enter password" />
        </div>
        <div className="btn-box">
          <button type="button">Update</button>
        </div>
      </form>
    </>
  );
};

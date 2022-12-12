import React, { useEffect, useState } from "react";
import "../../../components/Profile/ProfileView.scss";
import axios from "axios";

//  REDUX
import { useSelector } from "react-redux";
// import { updatename } from "../../Redux/User/userSlice";

export const ProfileView = () => {
  const name = useSelector((state) => state.userAcc.name);
  const email = useSelector((state) => state.userAcc.email);
  const role = useSelector((state) => state.userAcc.role);
  const section = useSelector((state) => state.userAcc.section);
  const course = useSelector((state) => state.userAcc.course);
  const studId = useSelector((state) => state.userAcc.accNo);

  return (
    <div>
      <div className="field-box">
        <p className="field-name">
          I.D. <span>:</span>
        </p>
        <p>{studId}</p>
      </div>
      <div className="field-box">
        <p className="field-name">
          Name <span>:</span>
        </p>
        <p>{name}</p>
      </div>
      <div className="field-box">
        <p className="field-name">
          Section <span>:</span>
        </p>
        <p>{section}</p>
      </div>
      <div className="field-box">
        <p className="field-name">
          Course <span>:</span>
        </p>
        <p>{course}</p>
      </div>
      <div className="field-box">
        <p className="field-name">
          Role <span>:</span>
        </p>
        <p>{role}</p>
      </div>
      <div className="field-box">
        <p className="field-name">
          Email <span>:</span>
        </p>
        <p>{email}</p>
      </div>
    </div>
  );
};

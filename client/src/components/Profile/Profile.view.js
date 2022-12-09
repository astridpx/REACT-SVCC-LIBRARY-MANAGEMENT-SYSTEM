import React, { useEffect, useState } from "react";
import "./ProfileView.scss";
import axios from "axios";

//  REDUX
// import { useDispatch } from "react-redux";
// import { updatename } from "../../Redux/User/userSlice";

export const ProfileView = ({ adminInfoFunction }) => {
  const [adminInfo, setAdminInfo] = useState("");
  const adminInfoPass = [];

  useEffect(() => {
    let adminCleanUp = true;
    const url = "http://localhost:5000/admin";

    axios.get(url).then((result) => {
      // PUSHING THE DATA TO THE ARRAY (ADMININFOPASS)
      // PASSING THE VALUE TO THE PARENT ELEMENT
      adminInfoPass.push(result.data);
      adminInfoFunction(adminInfoPass);

      const admin = result.data.map((props) => {
        return (
          <div key={props.ADMIN_ID}>
            <div className="field-box">
              <p className="field-name">
                I.D. <span>:</span>
              </p>
              <p>{props.school_ID}</p>
            </div>
            <div className="field-box">
              <p className="field-name">
                Name <span>:</span>
              </p>
              <p>{props.name}</p>
            </div>
            <div className="field-box">
              <p className="field-name">
                Section <span>:</span>
              </p>
              <p>{props.section}</p>
            </div>
            <div className="field-box">
              <p className="field-name">
                Course <span>:</span>
              </p>
              <p>{props.course}</p>
            </div>
            <div className="field-box">
              <p className="field-name">
                Role <span>:</span>
              </p>
              <p>{props.role}</p>
            </div>
            <div className="field-box">
              <p className="field-name">
                Email <span>:</span>
              </p>
              <p>{props.email}</p>
            </div>
          </div>
        );
      });
      setAdminInfo(admin);
    });

    return () => {
      adminCleanUp = false;
    };
  }, []);

  return <>{adminInfo}</>;
};

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
// import "../Css/Profile.css";
import "../Styles/Profile.scss";
import ProImg from "../assets/profile.png";
// import "../Css/ProfileView.css";
import "../components/Profile/ProfileView.scss";
import axios from "axios";

// navtab
import { ProfileView } from "../components/Profile/Profile.view";
import { ProfileEdit } from "../components/Profile/Prodile.edit";

const Profile = () => {
  const [adminInfo, setAdminInfo] = useState("");
  const [adminName, setAdminName] = useState("");
  const [adminRole, setAdminRole] = useState("");
  const [adminProfile, setAdminProfile] = useState("");

  //  show / hide profile details
  const [view, setView] = useState(true);
  const [edit, setEdit] = useState(false);

  // set id attribute
  const [idView, setIdView] = useState("active");
  const [idEdit, setIdEdit] = useState(null);

  // show hide upload
  const [upload, setUpload] = useState(false);
  const uploadRef = useRef();

  // GETTING THE DATA FROM CHILD COMPONENT (PROFILE VIEW)
  const adminInfoFunction = (adminInfoPass) => {
    adminInfoPass.map((props) => {
      setAdminName(props[0].name);
      setAdminRole(props[0].role);
    });
  };

  return (
    <>
      <div className="profile-container">
        <div className="nav-side">
          <Sidebar profile="active" />
        </div>

        <div className="profile-section-container">
          <section>
            <div className="nav-tab">
              <ul>
                <li>
                  <Link
                    id={idView}
                    onClick={() => {
                      setView(true);
                      setEdit(false);

                      // set id
                      setIdView("active");
                      setIdEdit(null);
                    }}
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link
                    id={idEdit}
                    onClick={() => {
                      setView(false);
                      setEdit(true);

                      // set id
                      setIdView(null);
                      setIdEdit("active");
                    }}
                  >
                    Edit Profile
                  </Link>
                </li>
              </ul>
            </div>
            {/* Profile image */}
            <main>
              <div className="profile-box-wrapper">
                {/* PRFILE IMAGE UPLOAD */}
                <form className="image-box">
                  <div
                    className="img-wrap"
                    onMouseEnter={() => setUpload(!upload)}
                    onMouseLeave={() => setUpload(false)}
                  >
                    <span
                      id={!idView && upload ? "upload" : null}
                      onClick={() => uploadRef.current.click()}
                    >
                      Upload
                      <input
                        type="file"
                        name=""
                        accept="image/*"
                        id="uploadPic"
                        ref={uploadRef}
                      />
                    </span>
                    <img src={ProImg} alt="profileimg" />
                  </div>
                  <div className="profile-info">
                    <h3>
                      {adminRole.charAt(0).toUpperCase() + adminRole.slice(1)}
                    </h3>
                    <p>{adminName}</p>
                  </div>
                </form>
                {/* {adminInfo} */}
              </div>
              {/* detailes */}
              <div className="profile-details">
                {edit ? (
                  <ProfileEdit />
                ) : (
                  <ProfileView adminInfoFunction={adminInfoFunction} />
                )}
              </div>
            </main>
          </section>
        </div>
      </div>
    </>
  );
};

export default Profile;

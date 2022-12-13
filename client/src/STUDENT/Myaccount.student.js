import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./components/Sidebar.student";
import Navbar from "../components/Navbar";
import "../Styles/Profile.scss";
import ProImg from "../assets/Adminprofile.png";
import "../components/Profile/ProfileView.scss";
import axios from "axios";
import Swal from "sweetalert2";

// navtab
import { ProfileView } from "../STUDENT/components/Profile-Student/Student.profile";
import { ProfileEdit } from "../STUDENT/components/Profile-Student/StudentEdit.profile";

// REDUX
import { useSelector, useDispatch } from "react-redux";

const Profile = () => {
  // ACCOUNT DETAILS
  const profileImg = useSelector((state) => state.userAcc.profileImg);
  const accId = useSelector((state) => state.userAcc.accId);
  const name = useSelector((state) => state.userAcc.name);
  const role = useSelector((state) => state.userAcc.role);

  //  show / hide profile details
  const [view, setView] = useState(true);
  const [edit, setEdit] = useState(false);

  // set id attribute
  const [idView, setIdView] = useState("active");
  const [idEdit, setIdEdit] = useState(null);

  // show hide upload
  const [upload, setUpload] = useState(false);
  const uploadRef = useRef();

  // SWEET ALERT
  const Toast = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      // toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  // HANDLE UPLOADING PROFILE PICTURE
  const handleProfilePictureUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("image", e.target.files[0]);

    const url = `http://localhost:5000/profile-upload/student/${localStorage.getItem(
      "id"
    )}`;

    axios
      .put(url, formData)
      .then((result) => {
        Toast.fire({
          icon: "success",
          title: result.data.message,
        }).then(() => window.location.reload(false));
      })
      .catch((err) => {
        console.log(err);
        Toast.fire({
          icon: "error",
          title: err.response.data.message,
        });
      });
  };

  return (
    <>
      <Navbar />
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
                        multiple={false}
                        id="uploadPic"
                        ref={uploadRef}
                        // value={adminProfile}
                        onChange={(e) => handleProfilePictureUpdate(e)}
                      />
                    </span>
                    <img
                      src={profileImg ? profileImg : ProImg}
                      alt="profileimg"
                    />
                  </div>
                  <div className="profile-info">
                    <h3>{role}</h3>
                    <p>{name}</p>
                  </div>
                </form>
                {/* {adminInfo} */}
              </div>
              {/* detailes */}
              <div className="profile-details">
                {edit ? <ProfileEdit /> : <ProfileView />}
              </div>
            </main>
          </section>
        </div>
      </div>
    </>
  );
};

export default Profile;

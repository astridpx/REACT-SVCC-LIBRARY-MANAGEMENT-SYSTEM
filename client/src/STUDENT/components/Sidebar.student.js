import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../Styles/Sidebar.scss";
import Profile from "../../assets/Adminprofile.png";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

// icons
import { RiAccountCircleLine } from "react-icons/ri";
import { BiBookBookmark } from "react-icons/bi";
import { BiBookAlt } from "react-icons/bi";
import { BiLogOut, BiHomeAlt } from "react-icons/bi";
import { GiBlackBook } from "react-icons/gi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import {
  accIdValue,
  profileImg_src,
  updateEmail,
  updatename,
  userRole,
  accountNo,
  sectionValue,
  courseValue,
} from "../../Redux/User/userSlice";

const StudentSidebar = (props) => {
  const name = useSelector((state) => state.userAcc.name);
  const profileImg = useSelector((state) => state.userAcc.profileImg);

  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    window.location.reload();
  };

  // STUDENT
  useEffect(() => {
    let cleanUp = true;
    const url = `http://localhost:5000/students/details/${localStorage.getItem(
      "id"
    )}`;

    axios
      .get(url)
      .then((result) => {
        dispatch(accIdValue({ accId: localStorage.getItem("id") }));
        dispatch(accountNo({ accNo: result.data[0].stud_no }));
        dispatch(updatename({ name: result.data[0].name }));
        dispatch(
          profileImg_src({
            profileImg: "http://localhost:5000/Images/" + result.data[0].image,
          })
        );
        dispatch(updateEmail({ email: result.data[0].email }));
        dispatch(sectionValue({ section: result.data[0].section }));
        dispatch(courseValue({ course: result.data[0].course }));
        dispatch(userRole({ role: result.data[0].role }));
      })
      .catch((err) => {
        console.log(err);
      });

    return () => (cleanUp = false);
  }, []);

  return (
    <>
      <div className="sidebar-container">
        <div className="line"></div>
        <div className="profile-box">
          <div className="image-box">
            <img src={profileImg ? profileImg : Profile} alt="" />
          </div>
          <h3>{name}</h3>
        </div>
        <div className="sidebar">
          <ul>
            {/* <li>
              <BiHomeAlt className="icons" id={props.home} />
              <Link to="/student/home" id={props.home}>
                Home
              </Link>
            </li> */}
            <li>
              <HiOutlineDocumentReport className="icons" id={props.records} />
              <Link to="/Student-records" id={props.records}>
                My Records
              </Link>
            </li>
            <li>
              <BiBookBookmark className="icons" id={props.issue} />
              <Link to="/student/issue" id={props.issue}>
                Issue Book
              </Link>
            </li>
            <li>
              <GiBlackBook className="icons" id={props.return} />
              <Link to="/student/return" id={props.return}>
                Return Book
              </Link>
            </li>
            <li>
              <BiBookAlt className="icons" id={props.availBook} />
              <Link to="/student/booklist" id={props.availBook}>
                Booklist
              </Link>
            </li>

            <li>
              <RiAccountCircleLine className="icons" id={props.profile} />
              <Link to="/student/profile" id={props.profile}>
                Profile
              </Link>
            </li>
            <li>
              <BiLogOut className="icons" onClick={handleLogout} />
              <Link onClick={handleLogout}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default StudentSidebar;

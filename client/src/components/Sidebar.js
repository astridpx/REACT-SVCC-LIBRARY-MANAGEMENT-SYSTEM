import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import "../Css/Sidebar.css";
import "../Styles/Sidebar.scss";
import Profile from "../assets/profile.png";
import axios from "axios";

// icons
import { BiHomeAlt } from "react-icons/bi";
import { RiAccountCircleLine } from "react-icons/ri";
import { BiBookBookmark } from "react-icons/bi";
import { TbBooks } from "react-icons/tb";
import { TbReportSearch } from "react-icons/tb";
import { BiBookAlt } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { GiBlackBook } from "react-icons/gi";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import {
  accIdValue,
  profileImg_src,
  updatename,
  updateEmail,
} from "../Redux/User/userSlice";
import {
  applicantReducer,
  booksReducer,
  issueReducer,
  memberReducer,
} from "../Redux/Dashboard-details/DashboardSlice";

const Sidebar = (props) => {
  // REDUX VALUES
  const name = useSelector((state) => state.userAcc.name);
  const profileImg = useSelector((state) => state.userAcc.profileImg);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    window.location.reload();
  };

  // USER ACC NAME DISPATCH
  const dispatch = useDispatch();

  const dataConfig = {
    url: "http://localhost:5000/admin",
    method: "get",
  };
  const url_member = "http://localhost:5000/students/";
  const url_applicants = "http://localhost:5000/students/applicants";
  const url_issue = "http://localhost:5000/allRecords/";
  const url_books = "http://localhost:5000/books";

  useEffect(() => {
    let userCleanUp = true;

    axios(dataConfig)
      .then((result) => {
        result.data.map((props) => {
          dispatch(accIdValue({ accId: props.ADMIN_ID }));
          dispatch(updatename({ name: props.name }));
          dispatch(
            profileImg_src({
              profileImg: "http://localhost:5000/Images/" + props.image,
            })
          );
          dispatch(updateEmail({ email: props.email }));
          return true;
        });
      })
      .catch((err) => {
        console.log(err);
      });

    // MEMBER COUNT
    axios
      .get(url_member)
      .then((result) => {
        dispatch(memberReducer({ membersNo: result.data.length }));
      })
      .catch((err) => {
        console.log(err);
      });

    // APPLICANTS COUNT
    axios
      .get(url_applicants)
      .then((result) => {
        dispatch(applicantReducer({ applicantsNo: result.data.length }));
      })
      .catch((err) => {
        console.log(err);
      });

    // ISSUE COUNTS
    axios
      .get(url_issue)
      .then((result) => {
        dispatch(issueReducer({ issueNo: result.data.length }));
      })
      .catch((err) => {
        console.log(err);
      });

    // BOOKS COUNTS
    axios
      .get(url_books)
      .then((result) => {
        dispatch(booksReducer({ booksNo: result.data.length }));
      })
      .catch((err) => {
        console.log(err);
      });

    return () => (userCleanUp = false);
  }, []);

  return (
    <>
      <div className="sidebar-container">
        <div className="line"></div>
        <div className="profile-box">
          <div className="image-box">
            <img src={profileImg} alt="" />
          </div>
          <h3>{name}</h3>
        </div>
        <div className="sidebar">
          <ul>
            <li>
              <BiHomeAlt className="icons" id={props.dashboard} />
              <Link to="/Dashboard" id={props.dashboard}>
                Dashboard
              </Link>
            </li>
            <li>
              <BiBookBookmark className="icons" id={props.issue} />
              <Link to="/Issue-Books" id={props.issue}>
                Issue Book
              </Link>
            </li>
            <li>
              <GiBlackBook className="icons" id={props.return} />
              <Link to="/Return-Books" id={props.return}>
                Return Book
              </Link>
            </li>
            <li>
              <TbBooks className="icons" id={props.books} />
              <Link to="/Books" id={props.books}>
                Book List
              </Link>
            </li>
            <li>
              <BiBookAlt className="icons" id={props.availBook} />
              <Link to="/Available-Books" id={props.availBook}>
                Available Book
              </Link>
            </li>
            <li>
              <TbReportSearch className="icons" id={props.records} />
              <Link to="/All-Records" id={props.records}>
                All Records
              </Link>
            </li>
            <li>
              <BsPeople className="icons" id={props.account} />
              <Link to="/Accounts" id={props.account}>
                Accounts
              </Link>
            </li>
            <li>
              <RiAccountCircleLine className="icons" id={props.profile} />
              <Link to="/Profile" id={props.profile}>
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

export default Sidebar;

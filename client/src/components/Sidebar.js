import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import "../Css/Sidebar.css";
import "../Styles/Sidebar.scss";
import Profile from "../assets/profile.png";

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

const Sidebar = (props) => {
  const name = useSelector((state) => state.userAcc.name);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>
      <div className="sidebar-container">
        <div className="line"></div>
        <div className="profile-box">
          <div className="image-box">
            <img src={Profile} alt="" />
          </div>
          <h3>{name}</h3>
        </div>
        <div className="sidebar">
          <ul>
            <li>
              <BiHomeAlt className="icons" id={props.dashboard} />
              <Link to="/" id={props.dashboard}>
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

import { useEffect, useState } from "react";
// import "../Css/Dashboard.css";
import "../Styles/Dashboard.scss";
import Charts from "../components/Chart";
import Clock from "../components/Clock";
import Calendar from "../components/Calendar";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { IoIosPeople } from "react-icons/io";
import { MdPeopleAlt } from "react-icons/md";
import { GoIssueOpened } from "react-icons/go";
import { ImBooks } from "react-icons/im";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

const Dashboard = () => {
  const memberCount = useSelector((state) => state.dashboardDetails.membersNo);
  const applicantCount = useSelector(
    (state) => state.dashboardDetails.applicantsNo
  );
  const issueCount = useSelector((state) => state.dashboardDetails.issueNo);
  const booksCount = useSelector((state) => state.dashboardDetails.booksNo);

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="nav-side">
          <Sidebar dashboard="active" />
        </div>
        {/* content */}
        <div className="dashboard-section">
          {/* card section */}
          <div className="card-wrapper">
            <div className="card">
              <div className="card-icon icon-member">
                <IoIosPeople className="icons" />
              </div>
              <div className="card-title ">
                <p>Members</p>
                <h3>{memberCount}</h3>
              </div>
            </div>
            <div className="card">
              <div className="card-icon icon-applicants">
                <MdPeopleAlt className="icons" />
              </div>
              <div className="card-title">
                <p>Applicants</p>
                <h3>{applicantCount}</h3>
              </div>
            </div>
            <div className="card">
              <div className="card-icon icon-issued">
                <GoIssueOpened className="icons" />
              </div>
              <div className="card-title">
                <p>Issued</p>
                <h3>{issueCount}</h3>
              </div>
            </div>
            <div className="card">
              <div className="card-icon icon-books">
                <ImBooks className="icons" />
              </div>
              <div className="card-title">
                <p>Books</p>
                <h3>{booksCount} </h3>
              </div>
            </div>
          </div>
          {/* bottom section */}
          <section>
            <div className="chart-wrapper">
              <div className="chart-box">
                <Charts />
              </div>
            </div>
            <div className="right-box">
              <div className="clockBox">
                <Clock />
              </div>
              <div className="calendar">
                <Calendar />
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

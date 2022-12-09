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

//  REDUX
import { useDispatch } from "react-redux";
import { updatename } from "../Redux/User/userSlice";

const Dashboard = () => {
  const [userProfile, setuserProfile] = useState({
    file: [],
    filepreview: null,
  });

  // USER ACC NAME DISPATCH
  const dispatch = useDispatch();

  const dataConfig = {
    url: "http://localhost:5000/admin",
    method: "get",
  };

  useEffect(() => {
    let userCleanUp = true;
    axios(dataConfig)
      .then((result) => {
        result.data.map((props) => {
          dispatch(updatename({ name: props.name }));

          return true;
        });
      })
      .catch((err) => {
        console.log(err);
      });

    return () => (userCleanUp = false);
  }, []);

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
                <h3>20</h3>
              </div>
            </div>
            <div className="card">
              <div className="card-icon icon-applicants">
                <MdPeopleAlt className="icons" />
              </div>
              <div className="card-title">
                <p>Applicants</p>
                <h3>20</h3>
              </div>
            </div>
            <div className="card">
              <div className="card-icon icon-issued">
                <GoIssueOpened className="icons" />
              </div>
              <div className="card-title">
                <p>Issued</p>
                <h3>20</h3>
              </div>
            </div>
            <div className="card">
              <div className="card-icon icon-books">
                <ImBooks className="icons" />
              </div>
              <div className="card-title">
                <p>Books</p>
                <h3>20</h3>
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

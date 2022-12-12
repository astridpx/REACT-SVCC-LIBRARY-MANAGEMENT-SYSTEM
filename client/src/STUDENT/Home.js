import React from "react";
import Sidebar from "./components/Sidebar.student";
import Navbar from "../components/Navbar";
import "./Student-styles/home.scss";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="student-container">
        <div className="nav-side">
          <Sidebar />
        </div>
        {/* <section className="student-wrapper"> */}
        <h1>Student</h1>
        {/* </section> */}
      </div>
    </>
  );
};

export default Home;

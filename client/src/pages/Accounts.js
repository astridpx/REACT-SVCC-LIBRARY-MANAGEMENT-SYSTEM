import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
// import "../Css/Accounts.css";
import "../Styles/Accounts.scss";
// import Profile from "../assets/profile.png";
import { AccountList } from "../components/Account/Account.list";
import { AccountApplicants } from "../components/Account/Account.applicants";

const Accounts = () => {
  const [active, setActive] = useState("active");
  const [activeB, setActiveB] = useState("");
  const [account, setAccount] = useState(true);
  const [applicants, setApplicants] = useState(false);

  const showAccount = () => {
    setActive("active");
    setActiveB(null);
    setAccount(true);
  };

  const showApplicants = () => {
    setActiveB("active");
    setActive(null);
    setAccount(false);
    setApplicants(true);
  };

  return (
    <>
      <div className="account-container">
        <div className="nav-side">
          <Sidebar account="active" />
        </div>
        <div className="acc-table-container">
          <div className="account-wrapper">
            <header>
              <h2>Student Accounts</h2>
              <div className="nav-wrapper">
                <nav>
                  <Link id={active} onClick={showAccount}>
                    Accounts
                  </Link>
                  <Link id={activeB} onClick={showApplicants}>
                    Applicants
                  </Link>
                </nav>
                <div className="search-box">
                  <input type="text" placeholder="Search here..." />
                  <button>Search</button>
                </div>
              </div>
            </header>
            <div className="table-wrapper">
              {account ? <AccountList /> : <AccountApplicants />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accounts;

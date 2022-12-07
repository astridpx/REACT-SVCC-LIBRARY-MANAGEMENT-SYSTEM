import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoutes from "./utils/PrivateRoutes";

// pages
import Dashboard from "./pages/Dashboard";
import IssueBooks from "./pages/IssueBook";
import ReturnBook from "./pages/ReturnBook";
import Book from "./pages/Books";
import AvailableBooks from "./pages/AvailableBooks";
import AllRecord from "./pages/Records";
import Account from "./pages/Accounts";
import Profile from "./pages/Profile";

// LOGIN REGISTER
import Login from "./pages/Login-Register/Login";

function App() {
  return (
    <>
      {/* basename={window.location.pathname || ""} */}

      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/Issue-Books" exact element={<IssueBooks />} />
            <Route path="/Return-Books" exact element={<ReturnBook />} />
            <Route path="/Books" exact element={<Book />} />
            <Route path="/Available-Books" exact element={<AvailableBooks />} />
            <Route path="/All-Records" exact element={<AllRecord />} />
            <Route path="/Accounts" exact element={<Account />} />
            <Route path="/Profile" exact element={<Profile />} />
          </Route>

          <Route path="/Login" exact element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

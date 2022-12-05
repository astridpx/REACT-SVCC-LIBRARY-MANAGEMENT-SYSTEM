import React, { useEffect, useState } from "react";
import "../../Styles/Login.scss";

// COMPONENT FORM
import AdminForm from "./components/AdminForm.login";
import Studentform from "./components/StudentForm.login";
import StudentSignUp from "./components/Student.register";

const Login = () => {
  const [showStudForm, setShowStudForm] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const showSignUpForm = (value) => {
    setShowSignUp(value);
  };

  const showSignUpFormValue = (value) => {
    setShowSignUp(value);
  };

  const AdminStudentloginForm = (value) => {
    setShowStudForm(value);
  };

  return (
    <>
      <div className="loginContainer">
        {!showSignUp ? (
          <StudentSignUp showSignUpForm={showSignUpForm} />
        ) : (
          <div className="loginform-wrapper">
            {/* FORMS */}
            {!showStudForm ? (
              <AdminForm AdminStudentloginForm={AdminStudentloginForm} />
            ) : (
              <Studentform
                AdminStudentloginForm={AdminStudentloginForm}
                // showSignUpFormValue={showSignUpFormValue}
                showSignUpForm={showSignUpForm}
              />
            )}

            {/* <div className="login-rightBox"></div> */}
            <aside>
              <div className="overlay">
                <h3>St. Vincent College of Cabuyao</h3>
                <h1>Truth Knowledge Service</h1>
                {/* <p>SVCC&copy;2022</p> */}
              </div>
            </aside>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;

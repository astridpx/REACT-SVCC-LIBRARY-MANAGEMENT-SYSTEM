import React, { useEffect, useState } from "react";
import "../../Styles/Login.scss";

// COMPONENT FORM
import AdminForm from "./components/AdminForm.login";
import Studentform from "./components/StudentForm.login";
import StudentSignUp from "./components/Student.register";

// REDUX
import { useSelector, useDispatch } from "react-redux";

const Login = () => {
  const showSignUpValue = useSelector(
    (state) => state.showHideSignUp.signUpShowValue
  );

  const [showStudForm, setShowStudForm] = useState(false);

  // SHOW HIDE ADMIN STUDENT LOGIN FORM
  const AdminStudentloginForm = (value) => {
    setShowStudForm(value);
  };

  return (
    <>
      <div className="loginContainer">
        <div className="login-overlay">
          <div className="login-wrapper">
            {!!showSignUpValue ? (
              <StudentSignUp />
            ) : (
              <div className="loginform-wrapper">
                {/* FORMS */}
                {!showStudForm ? (
                  <AdminForm AdminStudentloginForm={AdminStudentloginForm} />
                ) : (
                  <Studentform AdminStudentloginForm={AdminStudentloginForm} />
                )}

                {/* <div className="login-rightBox"></div> */}
                <aside className="loginRightBox">
                  <div className="overlay">
                    <h3>St. Vincent College of Cabuyao</h3>
                    <h1>Truth Knowledge Service</h1>
                    {/* <p>SVCC&copy;2022</p> */}
                  </div>
                </aside>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

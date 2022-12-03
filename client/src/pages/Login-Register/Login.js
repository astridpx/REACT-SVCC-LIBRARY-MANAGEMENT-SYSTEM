import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../Styles/Login.scss";

import { FiUser } from "react-icons/fi";
import { AiOutlineLock, AiFillEye } from "react-icons/ai";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
// import { icons } from "react-icons/lib";

const Login = () => {
  const [showHide, setShowHide] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // SHOW HIDE PASSWORD FUNCTION
  const ShowHidePassword = () => {
    setShowHide(!showHide);
  };

  return (
    <>
      <div className="loginContainer">
        <div className="loginform-wrapper">
          <form action="">
            <header className="loginHead">
              <h2>Welcome To</h2>
              <h1>SVCC LIBRARY MANAGEMENT SYSTEM</h1>
              <p>Login to get the books that interest you.</p>
            </header>

            <div className="formField">
              <div className="inputField">
                <label htmlFor="email">
                  <FiUser id="icons" />
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  autoComplete="off"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="inputField">
                <label htmlFor="password">
                  <AiOutlineLock id="icons" />
                </label>

                <input
                  type={!showHide ? "password" : "text"}
                  name="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {/* SHOW / HIDE PASSWORD */}
                <label
                  htmlFor="password"
                  style={{ display: password.length > 0 ? "unset" : "none" }}
                >
                  {!showHide ? (
                    <AiOutlineEyeInvisible
                      id="eye-icon"
                      onClick={ShowHidePassword}
                    />
                  ) : (
                    <AiOutlineEye id="eye-icon" onClick={ShowHidePassword} />
                  )}
                </label>
              </div>
              <div className="inputField">
                <button type="button" className="btn-signIn">
                  SIGN IN
                </button>
              </div>
              <div className="bottomForm">
                <p>
                  Login as
                  <span>
                    <Link>Student</Link>
                  </span>
                </p>
              </div>
            </div>
          </form>
          {/* <div className="login-rightBox"></div> */}
          <aside>
            <div className="overlay">
              <h3>St. Vincent College of Cabuyao</h3>
              <h1>Truth Knowledge Service</h1>
              {/* <p>SVCC&copy;2022</p> */}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default Login;

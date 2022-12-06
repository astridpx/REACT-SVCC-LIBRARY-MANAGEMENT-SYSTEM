import { useState } from "react";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { AiOutlineLock } from "react-icons/ai";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { update } from "../../../Redux/SignUpForm-Redux/signUpSlice";

const Studentform = ({ AdminStudentloginForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showHide, setShowHide] = useState(false);

  // SHOW HIDE PASSWORD FUNCTION
  const ShowHidePassword = () => {
    setShowHide(!showHide);
  };
  const dispatch = useDispatch();

  return (
    <>
      <div className="student-form-wrapper">
        <header className="studentHead">
          <h2>Welcome To</h2>
          <h1>SVCC LIBRARY MANAGEMENT SYSTEM</h1>
          <p>Login to get the books that interest you.</p>
        </header>

        <form action="" className="studentForm">
          <div className="studInput">
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
          <div className="studInput">
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

          <button type="button" className="stud-signIn">
            SIGN IN AS A STUDENT
          </button>
        </form>

        {/* footer */}
        <div className="formBottom">
          <p className="signUp-txt">
            Don't have an account yet?
            <span
              onClick={() => {
                // showSignUpForm(true);
                dispatch(update({ signUpShowValue: true }));
              }}
            >
              Sign Up
            </span>
          </p>
          <p className="loginAdmin-txt">
            Login as
            <span
              onClick={() => {
                AdminStudentloginForm(false);
              }}
            >
              Admin
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Studentform;

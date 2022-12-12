import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { AiOutlineLock } from "react-icons/ai";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import axios from "axios";
import Swal from "sweetalert2";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { update } from "../../../Redux/SignUpForm-Redux/signUpSlice";

const Studentform = ({ AdminStudentloginForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showHide, setShowHide] = useState(false);

  const navigate = useNavigate();

  // SHOW HIDE PASSWORD FUNCTION
  const ShowHidePassword = () => {
    setShowHide(!showHide);
  };

  // REDUX DISPATCH
  const dispatch = useDispatch();

  // SWEET ALERT
  const Toast = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const HandleSUbmitStudentLogin = (e) => {
    e.preventDefault();

    const dataConfig = {
      url: "http://localhost:5000/students/login",
      method: "post",
      data: {
        email,
        password,
      },
    };

    axios(dataConfig)
      .then((result) => {
        Toast.fire({
          icon: "success",
          title: result.data.message,
        })
          .then(() => {
            dispatch(update({ signUpShowValue: false }));
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("id", result.data.id);
            localStorage.setItem("role", result.data.role);
          })
          .then(() => navigate("/"));
      })
      .catch((error) => {
        Toast.fire({
          icon: "error",
          title: error.response.data.message,
        });
      });
  };

  return (
    <>
      <div className="student-form-wrapper">
        <header className="studentHead">
          <h2>Welcome To</h2>
          <h1>SVCC LIBRARY MANAGEMENT SYSTEM</h1>
          <p>Login to get the books that interest you.</p>
        </header>

        <form
          action=""
          className="studentForm"
          onSubmit={(e) => HandleSUbmitStudentLogin(e)}
        >
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

          <button type="submit" className="stud-signIn">
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

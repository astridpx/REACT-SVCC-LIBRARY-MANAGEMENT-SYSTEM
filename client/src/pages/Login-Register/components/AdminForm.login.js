import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import { FiUser } from "react-icons/fi";
import { AiOutlineLock } from "react-icons/ai";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const AdminForm = ({ AdminStudentloginForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showHide, setShowHide] = useState(false);

  const navigate = useNavigate();
  // SHOW HIDE PASSWORD FUNCTION
  const ShowHidePassword = () => {
    setShowHide(!showHide);
  };

  // SWEET ALERT
  const Toast = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const HandleSubmitAdminLogin = (e) => {
    e.preventDefault();

    // axios.defaults.withCredentials = true;
    const dataConfig = {
      url: "http://localhost:5000/admin/adminLogin",
      method: "POST",
      data: {
        email,
        password,
      },
    };
    console.log(dataConfig);
    axios(dataConfig)
      .then((result) => {
        Toast.fire({
          icon: "success",
          title: result.data.message,
        })
          .then(() => {
            localStorage.setItem("token", result.data.token);
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
      <form
        action=""
        className="adminAnimate"
        onSubmit={(e) => HandleSubmitAdminLogin(e)}
      >
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
              autoComplete="off"
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
            <button type="submit" className="btn-signIn">
              SIGN IN
            </button>
          </div>
          <div className="bottomForm">
            <p>
              Login as
              <span
                onClick={(e) => {
                  AdminStudentloginForm(true);
                }}
              >
                Student
              </span>
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default AdminForm;

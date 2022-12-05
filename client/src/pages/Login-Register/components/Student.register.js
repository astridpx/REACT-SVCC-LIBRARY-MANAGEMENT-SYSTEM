import { useState } from "react";
import "../../../Styles/Student.SignUp.scss";
import StudentLogo from "../../../assets/student.svg";
import Student from "../../../assets/student-Big-Img.svg";
import { FaLessThan } from "react-icons/fa";

const StudentRegister = ({ showSignUpForm }) => {
  const [studId, setStudId] = useState("");
  const [name, setName] = useState("");
  const [section, setSection] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="signUp-wrapper">
        <div className="signUp-LeftBox">
          <div className="studentImg-wrap">
            <img src={Student} alt="Student" className="studentBigImg" />
          </div>
          <div className="student-text">
            <h2>Let's go get you set up</h2>
            <p>
              It should only take a couple of minutes to create your account.
            </p>
            {/* BACK TO SIGN IN BUTTON */}
            <button
              className="btn-backSignIn"
              onClick={() => showSignUpForm(true)}
            >
              <span>
                <FaLessThan id="arrow" />
              </span>
              Back to Sign In
            </button>
          </div>
        </div>
        <div className="signUp-rightBox">
          <header className="header-signUp">
            <img src={StudentLogo} alt="student Logo" className="studentLogo" />
            <h3>Sign Up as Student</h3>
          </header>
          <form action="" className="signUp-Form">
            <div className="signUp-input">
              <label htmlFor="id">I.D.</label>
              <input type="text" name="id" />
            </div>
            <div className="signUp-input">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" />
            </div>
            <div className="signUp-input">
              <label htmlFor="section">Section</label>
              <input type="text" name="section" />
            </div>
            <div className="signUp-input">
              <label htmlFor="course">Course</label>
              <input type="text" name="course" />
            </div>
            <div className="signUp-input">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" />
            </div>
            <div className="signUp-input">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" />
            </div>
            <div className="signUp-btn-wrap">
              <button type="button" className="signUp-btn">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default StudentRegister;

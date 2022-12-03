import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
// import "../Css/ReturnBook.css";
import "../Styles/ReturnBook.scss";
import { QrReader } from "react-qr-reader";
import { FormatISBN } from "../helpers/isbn.format";
import { FormatStudID } from "../helpers/studID.format";
import axios from "axios";
import Swal from "sweetalert2";

const ReturnBook = () => {
  const [isbn, setISBN] = useState("");
  const [title, setTitle] = useState("");
  const [studId, setStudId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const navigate = useNavigate();

  // DEFAULT DATE RETURN => CURRENT DATE
  const date = new Date();
  const futureDate = date.getDate();
  date.setDate(futureDate);
  const today = date.toLocaleDateString("en-CA");

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

  // SCAN DATA DECODE
  const [scan, setScan] = useState(false);
  const [isbnScan, setIsbnScan] = useState("");
  const [titleScan, setTitleScan] = useState("");
  const [studIdScan, setStudIdScan] = useState("");
  const [nameScan, setNameScan] = useState("");
  const [emailScan, setEmailScan] = useState("");

  const Scanner = (
    <>
      <QrReader
        onResult={(result, error) => {
          if (result) {
            const url = `http://localhost:5000/allRecords/return/data-scan/${result.text}`;

            axios
              .get(url)
              .then(async (results) => {
                await results.data.map((props) => {
                  setIsbnScan(props.isbn);
                  setTitleScan(props.title);
                  setNameScan(props.name);
                  setStudIdScan(props.stud_no);
                  setEmailScan(props.email);
                  return true;
                });
              })
              .catch((err) => {
                Toast.fire({
                  icon: "error",
                  title: err.response.data.message,
                });
              });
            // window.location.reload(false);
          }
        }}
        style={{ position: "absolute", top: "0" }}
      />
      <div className="boxScanner"></div>
    </>
  );

  const handleISBN = (e) => {
    const formatedISBN = FormatISBN(e.target.value);
    setISBN(formatedISBN);
  };

  const handleStudId = (e) => {
    const formatedStudID = FormatStudID(e.target.value);
    setStudId(formatedStudID);
  };

  const configData = {
    method: "delete",
    url: "http://localhost:5000/allRecords/return/",
    data: {
      isbn: isbn || isbnScan,
      title,
      name,
      email,
    },
  };
  const HandleSubmit = (e) => {
    e.preventDefault();
    axios(configData)
      .then((result) => {
        Toast.fire({
          icon: "success",
          title: result.data.message,
        }).then(() => window.location.reload(false));
        // .finally(() => navigate("/All-Records"));
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err.response.data.message,
        });
      });
  };

  return (
    <>
      <Navbar />
      <div className="return-container">
        <div className="nav-side">
          <Sidebar return="active" />
        </div>
        <div className="return-form-container">
          <div className="form-return-wrapper">
            <form action="" onSubmit={(e) => HandleSubmit(e)}>
              <div className="return-field">
                <label htmlFor="isbn">ISBN</label>
                <input
                  type="text"
                  // ref={issueRef}
                  id="isbn"
                  placeholder="Enter isbn"
                  onChange={handleISBN}
                  value={scan ? isbnScan : isbn}
                  // value={isbn}
                  maxLength="12"
                  required
                  autoComplete="off"
                />
              </div>
              <div className="return-field">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  placeholder="Enter title"
                  value={scan ? titleScan : title.toUpperCase()}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="return-field">
                <label htmlFor="studID">Student I.D.</label>
                <input
                  type="text"
                  id="studID"
                  placeholder="Enter stud id"
                  value={scan ? studIdScan : "AY" + studId}
                  onChange={(e) => handleStudId(e)}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="return-field">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter name"
                  value={scan ? nameScan : name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="return-field">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Enter email"
                  value={scan ? emailScan : email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="return-field">
                <label htmlFor="returnDate">Date</label>
                <input type="date" id="returnDate" defaultValue={today} />
              </div>
              <button id="btn-return">Return</button>
            </form>

            {/* QR BOX */}
            <div className="qr-container">
              <div className="upper-box">
                <div className="qr-wrapper">
                  {scan ? Scanner : <p>Camera is Off</p>}
                  {/* <img src="" alt="qr" id="qrScan" /> */}
                </div>
              </div>
              <div className="bottom-box">
                <div className="radio-wrapper">
                  {/* <div className="radio-box">
                    <input type="radio" name="radio-cam" id="front" />
                    <label htmlFor="front">Front Cam</label>
                  </div> */}
                  {/* <div className="radio-box">
                    <input type="radio" name="radio-cam" id="back" />
                    <label htmlFor="back">Back Cam</label>
                    <p>{isbn}</p>
                  </div> */}
                </div>
                <div className="btn-wrapper">
                  <button id="btn-scan" onClick={() => setScan(true)}>
                    Scan
                  </button>
                  <button
                    id="btn-off"
                    onClick={() => {
                      setScan(false);
                      window.location.reload(false);
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
              {/* hhh */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReturnBook;

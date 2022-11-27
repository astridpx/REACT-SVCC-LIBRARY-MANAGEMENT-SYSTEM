import { useState } from "react";
import Sidebar from "../components/Sidebar";
// import "../Css/ReturnBook.css";
import "../Styles/ReturnBook.scss";
import { QrReader } from "react-qr-reader";
import { FormatISBN } from "../helpers/isbn.format";

const ReturnBook = () => {
  const [isbn, setISBN] = useState("");
  const [isbnScan, setIsbnScan] = useState("");
  const [scan, setScan] = useState(false);

  const Scanner = (
    <>
      <QrReader
        onResult={(result, error) => {
          if (result) {
            alert(result);
            setIsbnScan(result);
            // window.location.reload(false);
          }
          if (!!error) {
            console.log(error);
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
    // <FormatISBN />;
    FormatISBN();
  };

  return (
    <>
      <div className="return-container">
        <div className="nav-side">
          <Sidebar return="active" />
        </div>
        <div className="return-form-container">
          <div className="form-return-wrapper">
            <form action="">
              <div className="return-field">
                <label htmlFor="isbn">ISBN</label>
                <input
                  type="text"
                  // ref={issueRef}
                  id="isbn"
                  placeholder="Enter isbn"
                  onChange={handleISBN}
                  value={scan ? isbnScan : isbn}
                  maxLength="12"
                />
              </div>
              <div className="return-field">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" placeholder="Enter title" />
              </div>
              <div className="return-field">
                <label htmlFor="studID">Student I.D.</label>
                <input type="text" id="studID" placeholder="Enter stud id" />
              </div>
              <div className="return-field">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Enter name" />
              </div>
              <div className="return-field">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" placeholder="Enter email" />
              </div>
              <div className="return-field">
                <label htmlFor="returnDate">Date</label>
                <input type="date" id="returnDate" />
              </div>
              <button type="button" id="btn-return">
                Return
              </button>
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

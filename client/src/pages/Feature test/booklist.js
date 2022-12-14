import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
// import "../Css/AvailableBooks.css";
import "../../Styles/AvailableBooks.scss";
import axios from "axios";

const AvailableBooks = () => {
  const [availBooklist, setAvailBookList] = useState("");
  const [isbn, setIsbn] = useState("");
  const [showQr, setShowQr] = useState("none");

  useEffect(() => {
    let availCleanup = true;
    const url = "http://localhost:5000/books/availableBooks";

    axios
      .get(url)
      .then((result) => {
        const availBooks = result.data.map((props) => {
          return (
            <tr key={props.BOOK_ID}>
              <td>{props.isbn}</td>
              <td>{props.title}</td>
              <td className="author-box">{props.author}</td>
              <td>{props.published_date}</td>
              <td className="action">
                <button
                  id="view"
                  onClick={() => {
                    setIsbn(props.isbn);
                    setShowQr("flex");
                  }}
                >
                  View
                </button>
                <button id="download" onClick={() => alert("Download")}>
                  Download
                </button>
              </td>
            </tr>
          );
        });
        setAvailBookList(availBooks);
      })
      .catch((err) => console.log(err));

    return () => {
      availCleanup = false;
    };
  }, []);

  return (
    <>
      <div
        className="bookQr"
        style={{ display: showQr }}
        onClick={() => setShowQr("none")}
      >
        {/* <button>Close</button> */}
        <img
          src={`https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl=${isbn}`}
          alt=""
        />
      </div>
      <Navbar />
      <div className="books-container">
        <div className="nav-side">
          <Sidebar booklist="active" />
        </div>
        <div className="book-section">
          <section>
            <header>
              {/* content */}
              <h2> Available Books </h2>
              <div className="search-box">
                <div className="search-input">
                  <input
                    type="text"
                    placeholder="Search here..."
                    id="search"
                    autoComplete="off"
                  />
                  <button className="btn-search">Search</button>
                </div>
              </div>
            </header>
            <div className="table-section">
              <table>
                <thead>
                  <tr>
                    <th id="bookID">ISBN</th>
                    <th>Book Title</th>
                    <th>Author</th>
                    <th>Date Published</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {availBooklist.length > 0 ? (
                    availBooklist
                  ) : (
                    <h4>NO AVAILABLE BOOKS</h4>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AvailableBooks;

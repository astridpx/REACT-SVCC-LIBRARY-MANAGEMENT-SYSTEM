import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
// import "../Css/Books.css";
import "../Styles/Books.scss";

import { GrAdd } from "react-icons/gr";
import { FormAdd } from "../components/AddBook/Form.popup";
import { EditBookForm } from "../components/EditBook/EditBook";
import Swal from "sweetalert2";
import axios from "axios";

import { useDispatch } from "react-redux";
import { booksReducer } from "../Redux/Dashboard-details/DashboardSlice";

const Books = () => {
  const [booklist, setBooklist] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [btnHide, setBtnHide] = useState(1);
  // const [btnClose, setBtnClose] = useState(true);
  const [showEditForm, setEditForm] = useState(false);
  const [editData, setEditData] = useState([]);

  const dispatch = useDispatch();

  // SHOW / HIDE ADD FORM COMPONENT
  const handleForm = () => {
    setShowForm(true);
    setBtnHide(0);
  };
  const hideForm = (value) => {
    setShowForm(value);
  };

  // SHOW / HIDE EDIT FORM COMPONENT
  // PASSING THE DATE INTO EDIT FORM COMPONENT {CHILD COMPONENT}
  const handleEditForm = (props) => {
    setEditForm(true);
    setEditData([
      {
        id: props.BOOK_ID,
        author: props.author,
        isbn: props.isbn,
        title: props.title,
        publish: props.published_date,
      },
    ]);
  };
  const hideEditForm = (valueEdit, dataToUpdate) => {
    setEditForm(valueEdit);
  };

  // GET BOOKLIST API Integration
  // axios.default.withCredentials = true;
  useEffect(() => {
    let bookCleanup = true;
    const url = "http://localhost:5000/books";
    axios
      .get(url)
      .then((result) => {
        dispatch(booksReducer({ booksNo: result.data.length }));
        const Books = result.data.map((props) => {
          return (
            <tr key={props.BOOK_ID}>
              <td>{props.isbn}</td>
              <td>{props.title}</td>
              <td className="author-box">{props.author}</td>
              <td>{props.published_date}</td>
              <td className="action">
                <button id="edit" onClick={() => handleEditForm(props)}>
                  Edit
                </button>
                <button id="delete" onClick={() => DeleteBook(props)}>
                  Delete
                </button>
              </td>
            </tr>
          );
        });
        setBooklist(Books);
      })
      .catch((error) => alert(error));
    return () => {
      bookCleanup = false;
    };
  }, []);

  // DELETE API INTEGRATION
  const DeleteBook = (props) => {
    const configData = {
      method: "delete",
      url: `http://localhost:5000/books/deleteBook/${props.BOOK_ID}`,
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // API DELETE INTEGRATION
        axios(configData)
          .then((res) => Swal.fire("Deleted!", res.data, "success"))
          .then(() => window.location.reload(false))
          .catch((error) => {
            const Toast = Swal.mixin({
              toast: true,
              position: "center",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: "error",
              title: error,
            });
          });
      }
    });
  };

  return (
    <>
      <Navbar />
      {/* show hide form */}
      {showForm && <FormAdd hideForm={hideForm} />}
      {showEditForm && (
        <EditBookForm hideEditForm={hideEditForm} data={editData} />
      )}
      <div className="books-container">
        <div className="nav-side">
          <Sidebar books="active" />
        </div>
        <div className="book-sections">
          <section>
            <header>
              {/* content */}
              <h2> Books List</h2>
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
              {/* Button add */}
              <button
                id="btn-add"
                onClick={handleForm}
                style={{ opacity: showForm && btnHide }} // if the form is show(true) the button add will hide
              >
                <GrAdd />
              </button>
              <table>
                <thead>
                  <tr>
                    <th id="bookID">ISBN</th>
                    <th>Book Title</th>
                    <th>Author</th>
                    <th>Date Published</th>
                    <th>action</th>
                  </tr>
                </thead>
                <tbody>
                  {booklist.length > 0 ? booklist : <h4>No Records</h4>}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Books;

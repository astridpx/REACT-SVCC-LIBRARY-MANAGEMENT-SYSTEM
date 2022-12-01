import React, { useEffect, useRef, useState } from "react";
// import "../../Css/FormAdd.css";
import "./FormAdd.scss";
import Logo from "../../assets/addBook-logo-form.png";
import { IoClose } from "react-icons/io5";
import { FormatISBN } from "../../helpers/isbn.format";
import axios from "axios";
import Swal from "sweetalert2";

export const FormAdd = ({ hideForm }) => {
  const [isbn, setIsbn] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");

  const value = false;
  const bookRef = useRef();

  useEffect(() => {
    bookRef.current.focus();
  }, []);

  // API REQUEST DATA
  const configData = {
    method: "post",
    url: " http://localhost:5000/books/addBook",
    data: {
      isbn,
      title,
      author,
      published,
    },
  };
  // ADD BOOK API INTEGRATION
  const HandleSubmit = (e) => {
    e.preventDefault();

    // API INTEGRATIOn
    axios(configData)
      .then((res) => {
        const Toast = Swal.mixin({
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        Toast.fire(
          {
            icon: "success",
            title: res.data.message,
          },
          hideForm(value)
        ).then(() => window.location.reload(false));
      })
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
          title: error.response.data.message,
        });
      });
  };

  return (
    <>
      <div className="form-container">
        <form action="" onSubmit={(e) => HandleSubmit(e)}>
          <button
            id="btn-close"
            onClick={(e) => {
              e.preventDefault();
              hideForm(value);
            }}
          >
            <IoClose />
          </button>
          <header>
            <div className="logo-wrapper">
              <img src={Logo} />
            </div>
            <h2>Add Books</h2>
          </header>

          <div className="form-field">
            <label htmlFor="isbn">ISBN</label>
            <input
              type="text"
              id="isbn"
              ref={bookRef}
              required
              autoComplete="off"
              placeholder="000-0000-000"
              value={isbn}
              onChange={(e) => {
                const formatedISBN = FormatISBN(e.target.value);
                setIsbn(formatedISBN);
                FormatISBN();
              }}
            />
          </div>
          <div className="form-field">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Book Title"
              required
              autoComplete="off"
              value={title}
              onChange={(e) => setTitle(e.target.value.toUpperCase())}
            />
          </div>
          <div className="form-field">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              placeholder="Author of Book"
              required
              autoComplete="off"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="datePublished">Date Published</label>
            <input
              type="date"
              id="datePublished"
              required
              value={published}
              onChange={(e) => setPublished(e.target.value)}
            />
          </div>
          <button id="btn-save">Save</button>
        </form>
      </div>
    </>
  );
};

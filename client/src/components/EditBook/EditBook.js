import React, { useEffect, useRef, useState } from "react";
// import "../../Css/FormAdd.css";
import "../AddBook/FormAdd.scss";
import Logo from "../../assets/addBook-logo-form.png";
import { IoClose } from "react-icons/io5";
import { FormatISBN } from "../../helpers/isbn.format";
import axios from "axios";
import Swal from "sweetalert2";

export const EditBookForm = ({ hideEditForm, data }) => {
  const [bookId, setBookId] = useState("");
  const [isbn, setIsbn] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");

  const valueEdit = false;
  const bookRef = useRef();

  // FOCUS ON FIELD
  useEffect(() => {
    bookRef.current.focus();
  }, []);

  const configuration = {
    method: "put",
    url: `http://localhost:5000/books/updateBook/${bookId}`,
    data: {
      isbn,
      title,
      author,
      published,
    },
  };

  // api request
  const HandleSubmit = (e) => {
    e.preventDefault();
    // console.log(data);
    // UPDATE API INTEGRATION
    axios(configuration)
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
          hideEditForm(valueEdit)
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
          title: error,
        });
      });
  };

  const EditForm = data.map((value) => {
    console.log(value);
    return (
      <form onSubmit={(e) => HandleSubmit(e)} key={value.id}>
        <button
          id="btn-close"
          onClick={(e) => {
            e.preventDefault();
            hideEditForm(valueEdit);
          }}
        >
          <IoClose />
        </button>
        <header>
          <div className="logo-wrapper">
            <img src={Logo} />
          </div>
          <h2>Update Books</h2>
        </header>

        <div className="form-field">
          <label htmlFor="isbn">ISBN</label>
          <input
            type="text"
            id="isbn"
            ref={bookRef}
            required
            autoComplete="off"
            placeholder={value.isbn}
            value={isbn}
            onChange={(e) => {
              const formatedISBN = FormatISBN(e.target.value);
              setIsbn(formatedISBN);
              FormatISBN();
              setBookId(value.id);
            }}
          />
        </div>
        <div className="form-field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            required
            autoComplete="off"
            placeholder={value.title}
            value={title}
            onChange={(e) => setTitle(e.target.value.toUpperCase())}
          />
        </div>
        <div className="form-field">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            required
            autoComplete="off"
            placeholder={value.author}
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
            autoComplete="off"
            placeholder={value.publish}
            value={published}
            onChange={(e) => setPublished(e.target.value)}
          />
        </div>
        <button id="btn-save" type="submit">
          Update
        </button>
      </form>
    );
  });

  return (
    <>
      <div className="form-container">{EditForm}</div>
    </>
  );
};

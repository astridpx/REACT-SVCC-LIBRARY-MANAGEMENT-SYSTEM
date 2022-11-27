// import React from "react";

export const FormatISBN = (value) => {
  if (!value) return value;
  const ISBN = value.replace(/[^\d]/g, "");
  const isbnLength = ISBN.length;
  // the if 's will prevent the hypen to show up early
  if (isbnLength < 4) return ISBN;
  if (isbnLength < 8) {
    return `${ISBN.slice(0, 3)}-${ISBN.slice(3)}`;
  }
  return `${ISBN.slice(0, 3)}-${ISBN.slice(3, 7)}-${ISBN.slice(7, 10)}`;
};

// export default FormatISBN;

// import React from "react";

export const FormatStudID = (value) => {
  if (!value) return value;
  const studID = value.replace(/[^\d]/g, "");
  const studIDLength = studID.length;
  // the if 's will prevent the hypen to show up early
  if (studIDLength < 5) return studID;
  //   THIS WILL HANDLE THE EXCEDDING INOUT VALUE
  if (studIDLength < 9) {
    return `${studID.slice(0, 4)}-${studID.slice(4)}`;
  }
  return `${studID.slice(0, 4)}-${studID.slice(4, 9)}`;
};

// export default FormatISBN;

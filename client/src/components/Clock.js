import React, { useState, useEffect } from "react";

const DateTime = () => {
  var [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <p className="date"> {date.toDateString()}</p>
      <p className="time"> {date.toLocaleTimeString()}</p>
    </div>
  );
};

export default DateTime;

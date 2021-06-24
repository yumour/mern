import React, { useState } from "react";
import Moment from "react-moment";

const Updates = ({ updates }) => {
  const [offcanva, setOffcanva] = useState(false);
  return (
    <>
      <i
        class="fa fa-bell btn btn-dark mx-1"
        aria-hidden="true"
        onClick={() => {
          setOffcanva(true);
        }}
      ></i>

      {offcanva && (
        <div className="offcanva">
          <i class="close m-1" onClick={() => setOffcanva(false)}>
            <i class="fa fa-window-close" aria-hidden="true"></i>
          </i>
          {updates.length > 0 ? <h2>Your updates :</h2> : <h2> No updates</h2>}
          {updates.map((update) => (
            <p key={update._id}>
              {" "}
              {update.text}{" "}
              <Moment format="MMMM Do YYYY, h:mm a" className="update date">
                {update.date}
              </Moment>
            </p>
          ))}
        </div>
      )}
    </>
  );
};

export default Updates;

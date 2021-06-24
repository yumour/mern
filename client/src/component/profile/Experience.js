import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const Experience = ({ exprience }) => {
  return (
    <div className="profile-exp bg-white p-2">
      <h2 className="text-primary">Experience</h2>
      {exprience.map((exp) => (
        <div key={exp._id}>
          <h3 className="text-dark">exp.company</h3>
          <p>
            <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
            {exp.current ? (
              <>Current</>
            ) : (
              <Moment format="YYYY/MM/DD">{exp.to}</Moment>
            )}
          </p>
          <p>
            <strong>Position: </strong>
            {exp.title}
          </p>
          <p>
            <strong>Description: </strong>
            {exp.description}
          </p>
        </div>
      ))}
    </div>
  );
};

Experience.propTypes = {
  exprience: PropTypes.array.isRequired,
};

export default Experience;

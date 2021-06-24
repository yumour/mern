import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const Education = ({ education }) => {
  return (
    <div className="profile-educ bg-white p-2">
      <h2 className="text-primary">Education</h2>
      {education.map((educ) => (
        <div key={educ._id}>
          <h3 className="text-dark">educ.school</h3>
          <p>
            <Moment format="YYYY/MM/DD">{educ.from}</Moment> -{" "}
            {educ.current ? (
              <>Current</>
            ) : (
              <Moment format="YYYY/MM/DD">{educ.to}</Moment>
            )}
          </p>
          <p>
            <strong>Degree: </strong>
            {educ.degree}
          </p>
          <p>
            <strong>Field of study: </strong>
            {educ.fieldofstudy}
          </p>
          <p>
            <strong>Description: </strong>
            {educ.description}
          </p>
        </div>
      ))}
    </div>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
};

export default Education;

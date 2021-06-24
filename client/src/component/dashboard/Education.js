import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteEduc } from "../../actions/profile";

const Education = ({ education, deleteEduc }) => {
  return (
    <>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {education.map((educ) => (
            <tr key={educ._id}>
              <td>{educ.school}</td>
              <td className="hide-sm">{educ.degree}</td>
              <td className="hide-sm">
                <Moment format="YYYY/MM/DD">{educ.from}</Moment>-{" "}
                {educ.current ? (
                  "now"
                ) : (
                  <Moment format="YYYY/MM/DD">{educ.to}</Moment>
                )}
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteEduc(educ._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEduc: PropTypes.func.isRequired,
};

export default connect(null, { deleteEduc })(Education);

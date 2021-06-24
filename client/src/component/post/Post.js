import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Spinner from "../Layout/Spinner";
import {
  addCost,
  deleteCost,
  getPost,
  addFinnance,
  addSchedule,
  deleteFinnance,
  deleteSchedule,
} from "../../actions/post";
const Post = ({
  match,
  getPost,
  post,
  loading,
  user,
  addCost,
  deleteCost,
  addFinnance,
  addSchedule,
  deleteFinnance,
  deleteSchedule,
}) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match]);

  const [costForm, setCost] = useState({});
  const [finForm, setFin] = useState({});
  const [scheduleForm, setSchedule] = useState({});

  if (loading) {
    return <Spinner />;
  }
  if (!loading && post === null)
    return (
      <>
        <h2 className="my-5 mx-auto">
          Not found <Link to="/posts">go back</Link>
        </h2>
      </>
    );
  const {
    _id,
    costTotal,
    finTotal,
    location,
    title,
    description,
    contractor,
    cost,
    finnance,
    other,
    reason,
    status,
    creator,
    schedule,
    total,
    end,
    date,
    spent,
    number,
    modified,
  } = post;
  return (
    <>
      <section className="d-flex flex-row flex-wrap ">
        {(user._id === creator._id || user._id === contractor) && (
          <div className="analysis mb-2">
            {" "}
            <Link to={`/edit-post/${number}`} className="btn btn-primary ">
              Edit Post{" "}
            </Link>
          </div>
        )}
        <div className="text-secondary p-auth">
          <Link to={`/profile/${creator._id}`}>
            <img className="round-img" src={creator.avatar} alt="" />
            <h5 className="text-capitalize text-left text-primary">
              {creator.name}
            </h5>
          </Link>
        </div>
        <div className="flex-grow-2 ptitle">
          <h2>{title}</h2>
          <h3 className="text-right">N°{number}</h3>
        </div>
        <div>
          {modified && (
            <div>
              Last modified on:{" "}
              <Moment format="MMMM Do YYYY, h:mm a">{modified}</Moment>
            </div>
          )}
          <div>
            Created at: <Moment format="MMMM Do YYYY, h:mm a">{date}</Moment>
          </div>
        </div>
        <div className="table-responsive total">
          <table className="table">
            <thead>
              <tr>
                <th>Money spent</th>
                <th>Total estimated</th>
                <th>Date estimated</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {spent ? <span>{spent}$</span> : <span>Unassigned</span>}
                </td>
                <td>
                  {total ? <span>{total}$</span> : <span> Unassigned</span>}
                </td>
                <td>
                  {end ? (
                    <Moment format="DD/MM/YYYY">{end}</Moment>
                  ) : (
                    <span> Unassigned</span>
                  )}
                </td>
              </tr>
              <tr></tr>
            </tbody>
          </table>
        </div>
        <div className="flex-grow-1 flex-fill pdesc">
          {location && (
            <>
              <h4 className="d-inline ">Location </h4>
              <p className="d-inline">{location}</p>
            </>
          )}
          {description && (
            <>
              {" "}
              <h4>Description :</h4>
              <p>
                {description}
                <br />
              </p>
            </>
          )}
          <h4 className="d-inline-block pstatus">Status:</h4>
          <p className="d-inline-block">{status}</p>
          {reason && (
            <>
              <h4>Justification :</h4>
              <p>
                {reason}
                <br />
                <br />
              </p>{" "}
            </>
          )}
        </div>
        <div className="flex-grow-1 flex-fill analysis">
          <h4>
            COST Analysis :<br />
          </h4>
          <div className="table-responsive table">
            <table className="table">
              <thead>
                <tr>
                  <th scope="row">Activity</th>
                  <th scope="row">Amount</th>
                  <th scope="row"> </th>
                </tr>
              </thead>
              <tbody>
                <tr></tr>
                {cost.length > 0 &&
                  cost.map((c) => {
                    return (
                      <tr key={c._id}>
                        <td>{c.activity}</td>
                        <td s>{c.amount}$</td>
                        {(user._id === creator._id ||
                          user._id === contractor) && (
                          <td
                            className="btn btn-danger"
                            onClick={(e) => {
                              deleteCost(c._id, _id);
                            }}
                          >
                            <i className="fa fa-trash" aria-hidden="true"></i>
                            <span className="hide-sm">Delete</span>{" "}
                          </td>
                        )}
                      </tr>
                    );
                  })}

                <tr>
                  <td>
                    <b>total</b>
                  </td>
                  <td>
                    <b>{costTotal}$</b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {(user._id === creator._id || user._id === contractor) && (
            <div className="form-group bg-light">
              <form
                className="d-flex d-sm-flex  flex-wrap justify-content-start align-items-sm-start"
                onSubmit={(e) => {
                  e.preventDefault();
                  addCost(_id, costForm);
                }}
              >
                <input
                  type="text"
                  className="border rounded-0 border-dark shadow"
                  name="activity"
                  placeholder=" Acitivity"
                  value={costForm.activity}
                  onChange={(e) =>
                    setCost({ ...costForm, [e.target.name]: e.target.value })
                  }
                />
                <input
                  type="number"
                  className="border rounded border-dark shadow "
                  required
                  name="amount"
                  min="0"
                  placeholder=" Amount"
                  value={costForm.amount}
                  onChange={(e) =>
                    setCost({ ...costForm, [e.target.name]: e.target.value })
                  }
                />
                <button
                  className="btn bg-primary btn-outline-primary text-right float-right align-self-center flex-grow"
                  type="submit"
                >
                  Add
                </button>
              </form>
            </div>
          )}
        </div>
        <div className="analysis">
          <h4>Financing Analysis :</h4>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Source</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr></tr>
                {finnance.length > 0 &&
                  finnance.map((fin) => {
                    return (
                      <tr key={fin._id}>
                        <td>{fin.activity}</td>
                        <td>{fin.amount}$</td>
                        {(user._id === creator._id ||
                          user._id === contractor) && (
                          <td
                            className="btn btn-danger"
                            onClick={(e) => {
                              deleteFinnance(fin._id, _id);
                            }}
                          >
                            <i className="fa fa-trash" aria-hidden="true"></i>
                            <span className="hide-sm">Delete</span>{" "}
                          </td>
                        )}
                      </tr>
                    );
                  })}

                <tr>
                  <td>
                    <b>total</b>
                  </td>
                  <td>
                    <b>{finTotal}$</b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {(user._id === creator._id || user._id === contractor) && (
            <div className="form-group bg-light">
              <form
                className="d-flex d-sm-flex flex-wrap justify-content-start align-items-sm-start"
                onSubmit={(e) => {
                  e.preventDefault();
                  addFinnance(_id, finForm);
                }}
              >
                <input
                  type="text"
                  className="border rounded-0 border-dark shadow"
                  name="activity"
                  placeholder=" Source"
                  value={finForm.activity}
                  onChange={(e) =>
                    setFin({ ...finForm, [e.target.name]: e.target.value })
                  }
                />
                <input
                  type="number"
                  className="border rounded border-dark shadow"
                  required
                  name="amount"
                  min="0"
                  placeholder=" Amount"
                  value={finForm.amount}
                  onChange={(e) =>
                    setFin({ ...finForm, [e.target.name]: e.target.value })
                  }
                />
                <button
                  className="btn bg-primary btn-outline-primary flex-grow text-right float-right align-self-center"
                  type="submit"
                >
                  Add
                </button>
              </form>
            </div>
          )}
        </div>
        <div className="analysis">
          <h4>Schedule Analysis :</h4>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Activity</th>
                  <th>Done by</th>
                </tr>
              </thead>
              <tbody>
                <tr></tr>
                {schedule.length > 0 &&
                  schedule.map((sch) => (
                    <tr key={sch._id}>
                      <td>{sch.activity}</td>
                      <td>
                        <Moment format="DD/MM/YYYY">{sch.amount}</Moment>{" "}
                      </td>
                      {(user._id === creator._id ||
                        user._id === contractor) && (
                        <td
                          className="btn btn-danger"
                          onClick={(e) => {
                            deleteSchedule(sch._id, _id);
                          }}
                        >
                          <i className="fa fa-trash" aria-hidden="true"></i>
                          <span className="hide-sm">Delete</span>{" "}
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {(user._id === creator._id || user._id === contractor) && (
            <div className="form-group bg-light">
              <form
                className="d-flex d-sm-flex flex-wrap justify-content-start align-items-sm-start"
                onSubmit={(e) => {
                  e.preventDefault();
                  addSchedule(_id, scheduleForm);
                }}
              >
                <input
                  type="text"
                  className="border rounded-0 border-dark shadow"
                  name="activity"
                  placeholder=" Acitivity"
                  value={scheduleForm.activity}
                  onChange={(e) =>
                    setSchedule({
                      ...scheduleForm,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
                <input
                  type="date"
                  className="border rounded border-dark shadow"
                  required
                  name="amount"
                  placeholder=" Amount"
                  value={scheduleForm.amount}
                  onChange={(e) =>
                    setSchedule({
                      ...scheduleForm,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
                <button
                  className="btn bg-primary btn-outline-primary flex-grow text-right float-right align-self-center"
                  type="submit"
                >
                  Add
                </button>
              </form>
            </div>
          )}
        </div>
        {other && (
          <div>
            <h4>Other :</h4>
            <p>{other}</p>
          </div>
        )}
      </section>
    </>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  getPost: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post.post,
  loading: state.post.loading,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getPost,
  addCost,
  deleteCost,
  addFinnance,
  addSchedule,
  deleteFinnance,
  deleteSchedule,
})(Post);

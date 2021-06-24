import React, { useState, useEffect } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updatePost, getPost } from "../../actions/post";
import { getProfiles } from "../../actions/profile";

import Spinner from "../Layout/Spinner";
const EditPost = ({
  updatePost,
  history,
  loading,
  profileloading,
  profiles,
  getProfiles,
  post,
  getPost,
  match,
  user,
}) => {
  useEffect(() => {
    getProfiles();
    getPost(match.params.id);
  }, [getProfiles, getPost, match]);
  const [formData, setFormData] = useState({
    title: loading || !post.title ? "" : post.title,
    description: loading || !post.description ? "" : post.description,
    reason: loading || !post.reason ? "" : post.reason,
    total: loading || !post.total ? "" : post.total,
    end: loading || !post.end ? "" : post.end,
    spent: loading || !post.spent ? "" : post.spent,
    status: loading || !post.status ? "" : post.status,
    location: loading || !post.location ? "" : post.location,
    contractor: loading || !post.contractor ? "" : post.contractor,
    other: loading || !post.other ? "" : post.other,
    number: loading || !post.number ? "" : post.number,
  });

  if (loading || !profiles || profileloading) {
    return <Spinner />;
  }

  const {
    title,
    description,
    other,
    total,
    end,
    contractor,
    location,
    status,
    spent,
    reason,
  } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    updatePost(post._id, formData, history);
  };
  if (user._id !== post.creator._id && user._id !== contractor)
    return <Redirect to={`post/${post.number}`}></Redirect>;
  return (
    <>
      <h1 className="large text-primary">Create Your Post</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        project going
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label className="fw-bold fs-4" htmlFor="total">
            <b>Contractor :</b>
          </label>
          <br />
          <select
            name="contractor"
            onChange={(e) => onChange(e)}
            value={contractor}
          >
            <option value="" disabled>
              * Select A Contractor
            </option>
            {profiles
              .filter((profile) => profile.status === "Contractor")
              .map((profile) => {
                return (
                  <option value={profile.user._id}>{profile.user.name}</option>
                );
              })}
          </select>

          <small className="form-text">Give us an idea of what you do</small>
        </div>
        <div className="form-group">
          <label className="fw-bold fs-4" htmlFor="title">
            <b>Title :</b>
          </label>
          <br />
          <input
            type="text"
            placeholder="title"
            name="title"
            onChange={(e) => onChange(e)}
            value={title}
          />
          <small className="form-text">Give your projects title</small>
        </div>

        <div className="form-group">
          <label className="fw-bold fs-4" htmlFor="location">
            <b>Location :</b>
          </label>
          <br />
          <input
            type="text"
            placeholder="Location"
            name="location"
            onChange={(e) => onChange(e)}
            value={location}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <label className="fw-bold fs-4" htmlFor="description">
            <b>Descrtiption :</b>
          </label>
          <br />
          <textarea
            placeholder="A description of this project"
            name="description"
            onChange={(e) => onChange(e)}
            value={description}
          ></textarea>
          <small className="form-text">Tell us about your project</small>
        </div>
        <div className="form-group">
          <label className="fw-bold fs-4" htmlFor="total">
            <b>Status :</b>
          </label>
          <br />
          <select name="status" onChange={(e) => onChange(e)} value={status}>
            <option value="" disabled>
              * Select A Contractor
            </option>
            <option value="pending">Pending</option>
            <option value="aborted">Aborted</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
        <div className="form-group">
          <label className="fw-bold fs-4" htmlFor="reason">
            <b>Justification :</b>
          </label>
          <br />
          <textarea
            placeholder="A justification of the status of project"
            name="reason"
            onChange={(e) => onChange(e)}
            value={reason}
          ></textarea>
          <small className="form-text">Tell us about your project</small>
        </div>
        <div className="form-group">
          <label className="fw-normal" htmlFor="total">
            <b>Estimated Total :</b>
          </label>
          <br />
          <input
            type="number"
            placeholder="total"
            name="total"
            onChange={(e) => onChange(e)}
            min="0"
            value={total}
          />
          <small className="form-text">
            Tell your budget , or estimated total price for project
          </small>
        </div>
        <div className="form-group">
          <label className="fw-normal" htmlFor="spent">
            <b>Spent so far :</b>
          </label>
          <br />
          <input
            type="number"
            placeholder="spent"
            name="spent"
            onChange={(e) => onChange(e)}
            min="0"
            value={spent}
          />
          <small className="form-text">
            how much is spent on this project so far
          </small>
        </div>
        <div className="form-group">
          <label className="floatingInputInvalid" htmlFor="end">
            <b>Estimated Date to End</b>
          </label>
          <input
            type="date"
            placeholder="Date to End"
            name="end"
            onChange={(e) => onChange(e)}
            value={end}
          />
          <small className="form-text">Your estimated date to end ,</small>
        </div>
        <div className="form-group">
          <label className="fw-bold fs-4" htmlFor="other">
            <b>Other :</b>
          </label>{" "}
          <br />
          <textarea
            placeholder="Other"
            name="other"
            onChange={(e) => onChange(e)}
            value={other}
          ></textarea>
          <small className="form-text">
            Any other information worth mentioning
          </small>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" href="/dashboard">
          Go Back
        </Link>
      </form>
    </>
  );
};

EditPost.propTypes = {
  updatePost: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  profiles: state.profile.profiles,
  profileloading: state.profile.loading,
  loading: state.post.loading,
  post: state.post.post,
  user: state.auth.user,
});

export default connect(mapStateToProps, { updatePost, getProfiles, getPost })(
  withRouter(EditPost)
);

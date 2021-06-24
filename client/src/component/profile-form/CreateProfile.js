import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    insagram: "",
  });
  const [displaysocial, Toggledisplaysocial] = useState(false);
  const {
    company,
    website,
    location,
    status,
    skills,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <>
      <h1 classNameName="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <select name="status" onChange={(e) => onChange(e)} value={status}>
            <option value="0">* Select Professional Status</option>
            <option value="Contractor">Entrepreneur</option>
            <option value="Worker">Employee</option>
            <option value="Client">Client</option>
          </select>
          <small className="form-text">Give us an idea of what you do</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            onChange={(e) => onChange(e)}
            value={company}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            onChange={(e) => onChange(e)}
            value={website}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
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
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            onChange={(e) => onChange(e)}
            value={skills}
          />
          <small className="form-text">
            Please use comma separated values (eg.
            Masonry,Electrical,Carpentry,Repairs)
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            onChange={(e) => onChange(e)}
            value={bio}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            onClick={() => {
              Toggledisplaysocial(!displaysocial);
            }}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {displaysocial && (
          <>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                onChange={(e) => onChange(e)}
                value={twitter}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                onChange={(e) => onChange(e)}
                value={facebook}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                onChange={(e) => onChange(e)}
                value={youtube}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                onChange={(e) => onChange(e)}
                value={linkedin}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                onChange={(e) => onChange(e)}
                value={instagram}
              />
            </div>
          </>
        )}
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" href="/dashboard">
          Go Back
        </Link>
      </form>
    </>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(withRouter(CreateProfile));

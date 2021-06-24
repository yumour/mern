import React from "react";
import PropTypes from "prop-types";

const About = ({ profile: { skills, bio } }) => {
  return (
    <>
      <div className="profile-about bg-light p-2">
        <h2 className="text-primary"> Bio</h2>
        <p>{bio && <span>{bio}</span>}</p>
        <div className="line"></div>
        <h2 className="text-primary">Skill Set</h2>
        <div className="skills">
          {skills.map((skill) => (
            <div className="p-1" key={skill}>
              <i className="fa fa-check"></i> {skill}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

About.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default About;

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Layout/Spinner";
import { getProfiles } from "../../actions/profile";
import ProfileItem from "./ProfileItem";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  if (loading) return <Spinner />;

  return (
    <>
      <h1 className="large text-primary">Contractor</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i> Browse and connect with
        Contractors
      </p>
      <div className="profiles">
        {profiles ? (
          profiles.map((profile) => (
            <ProfileItem key={profile._id} profile={profile}></ProfileItem>
          ))
        ) : (
          <h3>No Profiles Found</h3>
        )}
      </div>
    </>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);

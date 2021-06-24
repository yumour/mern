import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Layout/Spinner";
import { getProfileById } from "../../actions/profile";
import { getPosts } from "../../actions/post";
import { Link } from "react-router-dom";
import Top from "./Top";
import About from "./About";
import Experience from "./Experience";
import Education from "./Education";
import Post from "./Post";

const Profile = ({
  getPosts,
  getProfileById,
  match,
  profile: { profile, loading },
  posts,
  isAuthenticated,
  user,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
    getPosts(match.params.id);
  }, [getProfileById, getPosts, match]);

  if (loading || profile === null) {
    return <Spinner />;
  }
  return (
    <>
      {" "}
      <Link to="/profiles" className="btn btn-light">
        Back To Profiles
      </Link>
      {isAuthenticated && user._id === profile.user._id && (
        <Link to="/edit-profile" className="btn btn-danger">
          {" "}
          Edit Profile
        </Link>
      )}
      <div className="profile-grid my-1">
        <Top profile={profile} />
        <About profile={profile} />
        <Experience exprience={profile.exprience} />
        <Education education={profile.education} />
        <Post posts={posts} />
      </div>
    </>
  );
};

Profile.propTypes = {
  getPosts: PropTypes.func.isRequired,
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  posts: state.post.posts,
});
export default connect(mapStateToProps, { getProfileById, getPosts })(Profile);

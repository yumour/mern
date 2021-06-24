import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Layout/Spinner";
import { getAllPosts } from "../../actions/post";
import { Link, withRouter } from "react-router-dom";
import PostItem from "./PostItem";
const Posts = ({ getAllPosts, posts, loading, history }) => {
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);
  const [number, setNumber] = useState(0);
  if (loading) return <Spinner />;

  const onClick = () => {
    history.push(`/post/${number}`);
  };

  return (
    <>
      <div className="posts">
        <Link className="btn btn-danger my-3" to="/create-post">
          Add Post
        </Link>

        <input
          className="my-3"
          type="number"
          name="number"
          onChange={(e) => setNumber(e.target.value)}
          value={number}
        />
        <button className="my-3 btn" onClick={onClick}>
          Search
        </button>

        {posts.map((post) => {
          return <PostItem post={post} />;
        })}
      </div>
    </>
  );
};

Posts.propTypes = {
  getAllPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  posts: state.post.posts,
  loading: state.post.loading,
});

export default connect(mapStateToProps, { getAllPosts })(withRouter(Posts));

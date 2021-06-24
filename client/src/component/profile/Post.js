import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Posts = ({ posts }) => {
  return (
    <>
      <div class="profile-github">
        <h2 class="text-primary my-1">
          <i class="fab fa-github"></i> Projects
        </h2>
        {posts.map((post) => (
          <div class="repo bg-white p-1 my-1" key={post.number}>
            <div>
              <h4>
                <Link to={`post/${post.number}`}>{post.title}</Link>
              </h4>
              <p>{post.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default Posts;

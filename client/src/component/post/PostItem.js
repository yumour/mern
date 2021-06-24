import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const PostItem = ({
  post: {
    description,
    number,
    date,
    creator: { _id, name, avatar },
    title,
  },
}) => {
  return (
    <>
      <div className="post bg-white p-1 my-1" key={number}>
        <div>
          <Link to={`/profiles/${_id}`}>
            <img className="round-img" src={avatar} alt="" />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <h3 className="my-1">{title}</h3>
          <p className="my-1">{description}</p>
          <p className="post-date">
            Posted on <Moment format="YYYY/DD/MM">{date}</Moment>
          </p>
          <Link to={`/post/${number}`} className="btn btn-primary">
            Check Project post
          </Link>
        </div>
      </div>
    </>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostItem;

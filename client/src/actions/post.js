import axios from "axios";
import { setAlert } from "./alert";

import { POST_ERROR, GET_POSTS, GET_POST, POST_CLEAR } from "./types";

export const updatePost = (id, post, history) => async (dispatch) => {
  try {
    dispatch({
      type: POST_CLEAR,
    });
    const res = await axios.put(`/api/post/${id}`, post);
    await axios.put(`/api/user/${res.data.contractor}`, {
      text: `project ${res.data.title} has been updated`,
      post: res.data._id,
    });
    await axios.put(`/api/user/${res.data.creator._id}`, {
      text: `project ${res.data.title} has been updated`,
      post: res.data._id,
    });
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
    dispatch(setAlert("Project updated", "success"));
    setTimeout(() => {
      history.push(`/post/${res.data.number}`);
    }, 2000);
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// get all projects by the user
export const getPosts = (userID) => async (dispatch) => {
  try {
    dispatch({
      type: POST_CLEAR,
    });
    const res = await axios.get(`/api/post/user/${userID}`);
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
export const getAllPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: POST_CLEAR,
    });
    const res = await axios.get(`/api/post`);
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
// get all projects by the user
export const getPost = (number) => async (dispatch) => {
  try {
    dispatch({
      type: POST_CLEAR,
    });
    const res = await axios.get(`/api/post/${number}`);
    let costTotal = 0;
    res.data.cost.forEach((fin) => {
      costTotal += fin.amount;
    });
    let finTotal = 0;
    res.data.finnance.forEach((fin) => {
      finTotal += fin.amount;
    });
    dispatch({
      type: GET_POST,
      payload: { ...res.data, finTotal, costTotal },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
// add cost to post
export const addCost = (id, cost) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/post/cost/${id}`, cost);

    await axios.put(`/api/user/${res.data.contractor}`, {
      text: `project ${res.data.title} has been updated`,
      post: res.data._id,
    });

    await axios.put(`/api/user/${res.data.creator._id}`, {
      text: `project ${res.data.title} has been updated`,
      post: res.data._id,
    });
    let costTotal = 0;
    res.data.cost.forEach((fin) => {
      costTotal += fin.amount;
    });
    let finTotal = 0;
    res.data.finnance.forEach((fin) => {
      finTotal += fin.amount;
    });
    dispatch({
      type: GET_POST,
      payload: { ...res.data, finTotal, costTotal },
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
export const addFinnance = (id, cost) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/post/finnance/${id}`, cost);
    await axios.put(`/api/user/${res.data.contractor}`, {
      text: `project ${res.data.title} has been updated`,
      post: res.data._id,
    });
    await axios.put(`/api/user/${res.data.creator._id}`, {
      text: `project ${res.data.title} has been updated`,
      post: res.data._id,
    });
    let costTotal = 0;
    res.data.cost.forEach((fin) => {
      costTotal += fin.amount;
    });
    let finTotal = 0;
    res.data.finnance.forEach((fin) => {
      finTotal += fin.amount;
    });
    dispatch({
      type: GET_POST,
      payload: { ...res.data, finTotal, costTotal },
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
export const addSchedule = (id, cost) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/post/schedule/${id}`, cost);
    await axios.put(`/api/user/${res.data.contractor}`, {
      text: `project ${res.data.title} has been updated`,
      post: res.data._id,
    });
    await axios.put(`/api/user/${res.data.creator._id}`, {
      text: `project ${res.data.title} has been updated`,
      post: res.data._id,
    });
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
export const deleteSchedule = (id, postId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/post/${postId}/schedule/${id}`);
    await axios.put(`/api/user/${res.data.contractor}`, {
      text: `project ${res.data.title} has been updated`,
      post: res.data._id,
    });
    await axios.put(`/api/user/${res.data.creator._id}`, {
      text: `project ${res.data.title} has been updated`,
      post: res.data._id,
    });
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const deleteCost = (id, postId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/post/${postId}/cost/${id}`);
    await axios.put(`/api/user/${res.data.contractor}`, {
      text: `project ${res.data.title} has been updated`,
      post: res.data._id,
    });
    await axios.put(`/api/user/${res.data.creator._id}`, {
      text: `project ${res.data.title} has been updated`,
      post: res.data._id,
    });
    let costTotal = 0;
    res.data.cost.forEach((fin) => {
      costTotal += fin.amount;
    });
    let finTotal = 0;
    res.data.finnance.forEach((fin) => {
      finTotal += fin.amount;
    });
    dispatch({
      type: GET_POST,
      payload: { ...res.data, finTotal, costTotal },
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
export const deleteFinnance = (id, postId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/post/${postId}/finnance/${id}`);
    await axios.put(`/api/user/${res.data.contractor}`, {
      text: `project ${res.data.title} has been delete`,
      post: res.data._id,
    });
    await axios.put(`/api/user/${res.data.creator._id}`, {
      text: `project ${res.data.title} has been updated`,
      post: res.data._id,
    });
    let costTotal = 0;
    res.data.cost.forEach((fin) => {
      costTotal += fin.amount;
    });
    let finTotal = 0;
    res.data.finnance.forEach((fin) => {
      finTotal += fin.amount;
    });
    dispatch({
      type: GET_POST,
      payload: { ...res.data, finTotal, costTotal },
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
export const addPost = (post, history) => async (dispatch) => {
  try {
    dispatch({
      type: POST_CLEAR,
    });
    const res = await axios.post(`/api/post`, post);
    await axios.put(`/api/user/${post.contractor}`, {
      text: "project ${res.data.title} has been added in ur name",
      post: res.data._id,
    });
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
    dispatch(setAlert("Project created", "success"));
    setTimeout(() => {
      history.push(`/post/${res.data.number}`);
    }, 2000);
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
export const deletePost = (post, history) => async (dispatch) => {
  try {
    await axios.delete(`/api/post/${post._id}`);
    dispatch({
      type: POST_CLEAR,
    });
    dispatch(setAlert("Project deleted", "danger"));
    await axios.put(`/api/user/${post.contractor}`, {
      text: `project ${post.title} has been delete`,
      post: post._id,
    });
    await axios.put(`/api/user/${post.creator._id}`, {
      text: `project ${post.title} has been updated`,
      post: post._id,
    });
    history.push(`/posts`);
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

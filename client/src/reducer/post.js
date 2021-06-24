import { GET_POSTS, POST_ERROR, GET_POST, POST_CLEAR } from "../actions/types";
const initialState = {
  post: null,
  posts: [],
  loading: true,
  error: [],
};
export default function profile(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POST: {
      return {
        ...state,
        post: payload,
        loading: false,
      };
    }

    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };

    case POST_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case POST_CLEAR:
      return { ...state, loading: true, post: null };
    default:
      return state;
  }
}

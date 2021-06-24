import {
  AUTH_ERROR,
  REGISTER_FAIL,
  REGISTER_SUCCES,
  USER_LOADED,
  LOGIN_FAIL,
  LOGIN_SUCCES,
  LOGOUT,
  ACCOUNT_DELETED,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case LOGIN_SUCCES:
    case REGISTER_SUCCES:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,

        isAuthenticated: true,
        loading: false,
        ...action.payload,
      };
    case ACCOUNT_DELETED:
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return { ...state, token: null, isAuthenticated: false, loading: false };
    default:
      return state;
  }
}

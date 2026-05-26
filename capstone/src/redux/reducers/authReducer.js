import {
  LOGIN,
  LOGIN_LOADING,
  LOGIN_ERROR,
  REGISTER,
  REGISTER_LOADING,
  REGISTER_ERROR,
  LOGOUT,
  CLEAR_ERROR,
} from "../actions/authAction"

const token = localStorage.getItem("token")

const initialState = {
  token: token || null,
  user: token ? JSON.parse(atob(token.split(".")[1])) : null,
  loading: false,
  error: false,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case LOGIN:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        user: action.payload.user,
      }

    case LOGIN_ERROR:
      return {
        ...state,
        loading: null,
        error: action.payload,
      }

    case REGISTER_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case REGISTER:
      return {
        ...state,
        loading: false,
      }

    case REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case LOGOUT:
      return {
        ...state,
        token: null,
        user: null,
      }

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      }

    default:
      return state
  }
}

export default authReducer

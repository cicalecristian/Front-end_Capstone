import {
  LOGIN,
  LOGIN_LOADING,
  LOGIN_ERROR,
  REGISTER,
  REGISTER_LOADING,
  REGISTER_ERROR,
  LOGOUT,
} from "../actions/authActions"

const initialState = {
  token: localStorage.getItem("token") || null,

  user: null,

  loading: false,

  error: false,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
      }

    case LOGIN:
      return {
        ...state,
        loading: false,
        token: action.payload,
      }

    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      }

    case REGISTER_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
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
        error: true,
      }

    case LOGOUT:
      return {
        ...state,
        token: null,
        user: null,
      }

    default:
      return state
  }
}

export default authReducer

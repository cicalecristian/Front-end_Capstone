import {
  GET_USERS,
  GET_USERS_LOADING,
  GET_USERS_ERROR,
  DELETE_USER,
  DELETE_USER_LOADING,
  DELETE_USER_ERROR,
  CHANGE_ROLE,
  CHANGE_ROLE_LOADING,
  CHANGE_ROLE_ERROR,
  CLEAR_ADMIN_USERS_ERROR,
} from "../actions/userAction"

const initialState = {
  users: [],
  loading: false,
  error: null,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_LOADING:
      return { ...state, loading: true, error: null }

    case GET_USERS:
      return {
        ...state,
        loading: false,
        users: action.payload.content,
      }

    case GET_USERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case DELETE_USER_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case DELETE_USER:
      return {
        ...state,
        loading: false,
        users: state.users.filter((u) => u.id !== action.payload),
      }

    case DELETE_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case CHANGE_ROLE_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case CHANGE_ROLE:
      return {
        ...state,
        loading: false,
        users: state.users.map((u) =>
          u.id === action.payload.id ? action.payload : u,
        ),
      }

    case CHANGE_ROLE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case CLEAR_ADMIN_USERS_ERROR:
      return {
        ...state,
        error: null,
      }

    default:
      return state
  }
}

export default userReducer

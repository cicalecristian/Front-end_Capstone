import {
  GET_PROFILE,
  GET_PROFILE_LOADING,
  GET_PROFILE_ERROR,
  UPDATE_PROFILE,
  UPDATE_PROFILE_LOADING,
  UPDATE_PROFILE_ERROR,
  DELETE_PROFILE,
  DELETE_PROFILE_LOADING,
  DELETE_PROFILE_ERROR,
  UPDATE_AVATAR,
  UPDATE_AVATAR_LOADING,
  UPDATE_AVATAR_ERROR,
  CLEAR_PROFILE_ERROR,
} from "../actions/profileAction"

const initialState = {
  profile: null,
  loading: false,
  error: null,
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case GET_PROFILE:
      return {
        ...state,
        loading: false,
        profile: action.payload,
      }

    case GET_PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case UPDATE_PROFILE_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case UPDATE_PROFILE:
      return {
        ...state,
        loading: false,
        profile: action.payload,
      }

    case UPDATE_PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case DELETE_PROFILE_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case DELETE_PROFILE:
      return {
        ...state,
        loading: false,
        profile: null,
      }

    case DELETE_PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case UPDATE_AVATAR_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case UPDATE_AVATAR:
      return {
        ...state,
        loading: false,
        profile: action.payload,
      }

    case UPDATE_AVATAR_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case CLEAR_PROFILE_ERROR:
      return {
        ...state,
        error: null,
      }

    default:
      return state
  }
}

export default profileReducer

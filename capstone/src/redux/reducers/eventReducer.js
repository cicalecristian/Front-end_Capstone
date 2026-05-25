import {
  GET_EVENTS,
  GET_EVENTS_LOADING,
  GET_EVENTS_ERROR,
  CLEAR_EVENT_ERROR,
  GET_SINGLE_EVENT,
  GET_SINGLE_EVENT_LOADING,
  GET_SINGLE_EVENT_ERROR,
} from "../actions/eventAction"

const initialState = {
  events: [],
  singleEvent: null,
  loading: false,
  error: null,
}

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENTS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case GET_EVENTS:
      return {
        ...state,
        loading: false,
        songs: action.payload,
      }

    case GET_EVENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case CLEAR_EVENT_ERROR:
      return {
        ...state,
        error: null,
      }

    case GET_SINGLE_EVENT_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case GET_SINGLE_EVENT:
      return {
        ...state,
        loading: false,
        singleEvent: action.payload,
      }

    case GET_SINGLE_EVENT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export default eventReducer

import {
  GET_EVENTS,
  GET_EVENTS_LOADING,
  GET_EVENTS_ERROR,
  CLEAR_EVENT_ERROR,
  GET_SINGLE_EVENT,
  GET_SINGLE_EVENT_LOADING,
  GET_SINGLE_EVENT_ERROR,
  CREATE_EVENT,
  CREATE_EVENT_LOADING,
  CREATE_EVENT_ERROR,
  UPDATE_EVENT,
  UPDATE_EVENT_LOADING,
  UPDATE_EVENT_ERROR,
  DELETE_EVENT,
  DELETE_EVENT_LOADING,
  DELETE_EVENT_ERROR,
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
        events: action.payload,
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

    case CREATE_EVENT_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case CREATE_EVENT:
      return {
        ...state,
        loading: false,
        error: null,
        events: [action.payload, ...state.events],
      }

    case CREATE_EVENT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case UPDATE_EVENT_LOADING:
    case DELETE_EVENT_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case UPDATE_EVENT:
      return {
        ...state,
        loading: false,
        error: null,
        events: state.events.map((event) =>
          event.id === action.payload.id ? action.payload : event,
        ),
        singleEvent:
          state.singleEvent?.id === action.payload.id
            ? action.payload
            : state.singleEvent,
      }

    case DELETE_EVENT:
      return {
        ...state,
        loading: false,
        error: null,
        events: state.events.filter((event) => event.id !== action.payload),
        singleEvent:
          state.singleEvent?.id === action.payload ? null : state.singleEvent,
      }

    case UPDATE_EVENT_ERROR:
    case DELETE_EVENT_ERROR:
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

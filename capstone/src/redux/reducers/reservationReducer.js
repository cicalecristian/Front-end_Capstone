import {
  GET_RESERVATIONS,
  GET_RESERVATIONS_LOADING,
  GET_RESERVATIONS_ERROR,
  GET_SINGLE_RESERVATIONS,
  GET_SINGLE_RESERVATIONS_LOADING,
  GET_SINGLE_RESERVATIONS_ERROR,
  CREATE_RESERVATION,
  CREATE_RESERVATION_LOADING,
  CREATE_RESERVATION_ERROR,
  DELETE_RESERVATION,
  DELETE_RESERVATION_LOADING,
  DELETE_RESERVATION_ERROR,
  CLEAR_RESERVATION_ERROR,
  CLEAR_CURRENT_RESERVATION,
} from "../actions/reservationAction"

const initialState = {
  reservations: [],
  currentReservation: null,
  loading: false,
  error: null,
}

const reservationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RESERVATIONS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case GET_RESERVATIONS:
      return {
        ...state,
        loading: false,
        reservations: action.payload.content,
      }

    case GET_RESERVATIONS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case GET_SINGLE_RESERVATIONS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case GET_SINGLE_RESERVATIONS:
      return {
        ...state,
        loading: false,
        currentReservation: action.payload,
      }

    case GET_SINGLE_RESERVATIONS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case CREATE_RESERVATION_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case CREATE_RESERVATION:
      return {
        ...state,
        loading: false,
        reservations: [action.payload, ...state.reservations],
      }

    case CREATE_RESERVATION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case DELETE_RESERVATION_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case DELETE_RESERVATION:
      return {
        ...state,
        loading: false,
        reservations: state.reservations.filter((r) => r.id !== action.payload),
      }

    case DELETE_RESERVATION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case CLEAR_RESERVATION_ERROR:
      return {
        ...state,
        error: null,
      }

    case CLEAR_CURRENT_RESERVATION:
      return {
        ...state,
        currentReservation: null,
      }

    default:
      return state
  }
}

export default reservationReducer

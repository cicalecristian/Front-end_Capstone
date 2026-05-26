import {
  GET_REVIEWS,
  GET_REVIEWS_LOADING,
  GET_REVIEWS_ERROR,
  GET_AVERAGE_RATING,
  ADD_REVIEW,
  ADD_REVIEW_ERROR,
  UPDATE_REVIEW,
  UPDATE_REVIEW_ERROR,
  CLEAR_REVIEW_ERROR,
} from "../actions/reviewAction"

const initialState = {
  reviews: [],
  averageRating: 0,
  loading: false,
  error: null,
}

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case GET_REVIEWS:
      return {
        ...state,
        loading: false,
        reviews: action.payload,
      }

    case GET_REVIEWS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case GET_AVERAGE_RATING:
      return {
        ...state,
        averageRating: action.payload,
      }

    case ADD_REVIEW:
      return {
        ...state,
      }

    case ADD_REVIEW_ERROR:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_REVIEW:
      return {
        ...state,
      }

    case UPDATE_REVIEW_ERROR:
      return {
        ...state,
        error: action.payload,
      }

    case CLEAR_REVIEW_ERROR:
      return {
        ...state,
        error: null,
      }

    default:
      return state
  }
}

export default reviewReducer

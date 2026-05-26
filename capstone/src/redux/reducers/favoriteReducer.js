import {
  GET_FAVORITES,
  GET_FAVORITES_LOADING,
  GET_FAVORITES_ERROR,
  ADD_FAVORITE,
  ADD_FAVORITE_ERROR,
  REMOVE_FAVORITE,
  REMOVE_FAVORITE_ERROR,
  CLEAR_FAVORITE_ERROR,
} from "../actions/favoriteAction"

const initialState = {
  favorites: [],
  loading: false,
  error: null,
}

const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FAVORITES_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case GET_FAVORITES:
      return {
        ...state,
        loading: false,
        favorites: action.payload,
      }

    case GET_FAVORITES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case ADD_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      }

    case ADD_FAVORITE_ERROR:
      return {
        ...state,
        error: action.payload,
      }

    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(
          (favorite) => favorite.id !== action.payload,
        ),
      }

    case REMOVE_FAVORITE_ERROR:
      return {
        ...state,
        error: action.payload,
      }

    case CLEAR_FAVORITE_ERROR:
      return {
        ...state,
        error: null,
      }

    default:
      return state
  }
}

export default favoriteReducer

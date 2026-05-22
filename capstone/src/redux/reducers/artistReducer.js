import {
  GET_ARTISTS,
  GET_ARTISTS_LOADING,
  GET_ARTISTS_ERROR,
  CLEAR_ARTIST_ERROR,
  GET_SINGLE_ARTIST,
  GET_SINGLE_ARTIST_LOADING,
  GET_SINGLE_ARTIST_ERROR,
} from "../actions/artistAction"

const initialState = {
  artists: [],
  singleArtist: null,
  loading: false,
  error: null,
}

const artistReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTISTS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case GET_ARTISTS:
      return {
        ...state,
        loading: false,
        artists: action.payload,
      }

    case GET_ARTISTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case CLEAR_ARTIST_ERROR:
      return {
        ...state,
        error: null,
      }

    case GET_SINGLE_ARTIST_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case GET_SINGLE_ARTIST:
      return {
        ...state,
        loading: false,
        singleArtist: action.payload,
      }

    case GET_SINGLE_ARTIST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export default artistReducer

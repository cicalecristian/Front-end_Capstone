import {
  GET_SONGS,
  GET_SONGS_LOADING,
  GET_SONGS_ERROR,
  CLEAR_SONG_ERROR,
  GET_SINGLE_SONG,
  GET_SINGLE_SONG_LOADING,
  GET_SINGLE_SONG_ERROR,
} from "../actions/songAction"

const initialState = {
  songs: [],
  singleSong: null,
  loading: false,
  error: null,
}

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SONGS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case GET_SONGS:
      return {
        ...state,
        loading: false,
        songs: action.payload,
      }

    case GET_SONGS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case CLEAR_SONG_ERROR:
      return {
        ...state,
        error: null,
      }

    case GET_SINGLE_SONG_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case GET_SINGLE_SONG:
      return {
        ...state,
        loading: false,
        singleSong: action.payload,
      }

    case GET_SINGLE_SONG_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export default songReducer

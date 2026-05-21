export const GET_SONGS = "GET_SONGS"
export const GET_SONGS_LOADING = "GET_SONGS_LOADING"
export const GET_SONGS_ERROR = "GET_SONGS_ERROR"
export const CLEAR_SONG_ERROR = "CLEAR_SONG_ERROR"
export const GET_SINGLE_SONG = "GET_SINGLE_SONG"
export const GET_SINGLE_SONG_LOADING = "GET_SINGLE_SONG_LOADING"
export const GET_SINGLE_SONG_ERROR = "GET_SINGLE_SONG_ERROR"

export const getSongsAction = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_SONGS_LOADING,
    })

    try {
      const token = localStorage.getItem("token")

      const headers = {}

      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      const response = await fetch("http://localhost:3001/songs", {
        headers,
      })

      const data = await response.json()

      if (response.ok) {
        dispatch({
          type: GET_SONGS,
          payload: data.content,
        })
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      let errorMessage = error.message

      if (error.message === "Failed to fetch") {
        errorMessage = "Unable to connect to the server"
      }

      dispatch({
        type: GET_SONGS_ERROR,
        payload: errorMessage,
      })
    }
  }
}

export const clearSongErrorAction = () => {
  return {
    type: CLEAR_SONG_ERROR,
  }
}

export const getSingleSongAction = (id) => {
  return async (dispatch) => {
    dispatch({
      type: GET_SINGLE_SONG_LOADING,
    })

    try {
      const response = await fetch(`http://localhost:3001/songs/${id}`)

      const data = await response.json()

      if (response.ok) {
        dispatch({
          type: GET_SINGLE_SONG,
          payload: data,
        })
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      dispatch({
        type: GET_SINGLE_SONG_ERROR,
        payload: error.message,
      })
    }
  }
}

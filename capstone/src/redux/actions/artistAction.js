export const GET_ARTISTS = "GET_ARTISTS"
export const GET_ARTISTS_LOADING = "GET_ARTISTS_LOADING"
export const GET_ARTISTS_ERROR = "GET_ARTISTS_ERROR"
export const CLEAR_ARTIST_ERROR = "CLEAR_ARTIST_ERROR"
export const GET_SINGLE_ARTIST = "GET_SINGLE_ARTIST"
export const GET_SINGLE_ARTIST_LOADING = "GET_SINGLE_ARTIST_LOADING"
export const GET_SINGLE_ARTIST_ERROR = "GET_SINGLE_ARTIST_ERROR"

export const getArtistsAction = (size = 15) => {
  return async (dispatch) => {
    dispatch({
      type: GET_ARTISTS_LOADING,
    })

    try {
      const token = localStorage.getItem("token")

      const headers = {}

      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      const response = await fetch(
        `http://localhost:3001/artists?size=${size}`,
        {
          headers,
        },
      )

      const data = await response.json()

      if (response.ok) {
        dispatch({
          type: GET_ARTISTS,
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
        type: GET_ARTISTS_ERROR,
        payload: errorMessage,
      })
    }
  }
}

export const clearArtistErrorAction = () => {
  return {
    type: CLEAR_ARTIST_ERROR,
  }
}

export const getSingleArtistAction = (id) => {
  return async (dispatch) => {
    dispatch({
      type: GET_SINGLE_ARTIST_LOADING,
    })

    try {
      const token = localStorage.getItem("token")

      const headers = {}

      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      const response = await fetch(`http://localhost:3001/artists/${id}`, {
        headers,
      })

      const data = await response.json()

      if (response.ok) {
        dispatch({
          type: GET_SINGLE_ARTIST,
          payload: data,
        })
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      dispatch({
        type: GET_SINGLE_ARTIST_ERROR,
        payload: error.message,
      })
    }
  }
}

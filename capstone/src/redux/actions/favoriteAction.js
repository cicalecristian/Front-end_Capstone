export const GET_FAVORITES = "GET_FAVORITES"
export const GET_FAVORITES_LOADING = "GET_FAVORITES_LOADING"
export const GET_FAVORITES_ERROR = "GET_FAVORITES_ERROR"
export const ADD_FAVORITE = "ADD_FAVORITE"
export const ADD_FAVORITE_ERROR = "ADD_FAVORITE_ERROR"
export const REMOVE_FAVORITE = "REMOVE_FAVORITE"
export const REMOVE_FAVORITE_ERROR = "REMOVE_FAVORITE_ERROR"
export const CLEAR_FAVORITE_ERROR = "CLEAR_FAVORITE_ERROR"

export const getFavoritesAction = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_FAVORITES_LOADING,
    })

    try {
      const token = localStorage.getItem("token")

      const headers = {}

      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      const response = await fetch("http://localhost:3001/favorites", {
        headers,
      })

      const data = await response.json()

      if (response.ok) {
        dispatch({
          type: GET_FAVORITES,
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
        type: GET_FAVORITES_ERROR,
        payload: errorMessage,
      })
    }
  }
}

export const addFavoriteAction = (songId) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token")

      const headers = {
        "Content-Type": "application/json",
      }

      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      const response = await fetch("http://localhost:3001/favorites", {
        method: "POST",

        headers,

        body: JSON.stringify({
          songId,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        dispatch({
          type: ADD_FAVORITE,
          payload: data,
        })
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      dispatch({
        type: ADD_FAVORITE_ERROR,
        payload: error.message,
      })
    }
  }
}

export const removeFavoriteAction = (favoriteId) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token")

      const headers = {}

      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      const response = await fetch(
        `http://localhost:3001/favorites/${favoriteId}`,
        {
          method: "DELETE",
          headers,
        },
      )

      if (response.ok) {
        dispatch({
          type: REMOVE_FAVORITE,
          payload: favoriteId,
        })
      }
    } catch (error) {
      dispatch({
        type: REMOVE_FAVORITE_ERROR,
        payload: error.message,
      })
    }
  }
}

export const clearFavoriteErrorAction = () => {
  return {
    type: CLEAR_FAVORITE_ERROR,
  }
}

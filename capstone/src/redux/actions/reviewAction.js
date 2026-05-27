export const GET_REVIEWS = "GET_REVIEWS"
export const GET_REVIEWS_LOADING = "GET_REVIEWS_LOADING"
export const GET_REVIEWS_ERROR = "GET_REVIEWS_ERROR"
export const GET_AVERAGE_RATING = "GET_AVERAGE_RATING"
export const ADD_REVIEW = "ADD_REVIEW"
export const ADD_REVIEW_ERROR = "ADD_REVIEW_ERROR"
export const UPDATE_REVIEW = "UPDATE_REVIEW"
export const UPDATE_REVIEW_ERROR = "UPDATE_REVIEW_ERROR"
export const CLEAR_REVIEW_ERROR = "CLEAR_REVIEW_ERROR"

export const getReviewsAction = (songId) => {
  return async (dispatch) => {
    dispatch({
      type: GET_REVIEWS_LOADING,
    })

    try {
      const token = localStorage.getItem("token")

      const headers = {}

      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      const response = await fetch(
        `http://localhost:3001/reviews/song/${songId}`,
        {
          headers,
        },
      )

      const data = await response.json()

      if (response.ok) {
        dispatch({
          type: GET_REVIEWS,
          payload: data,
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
        type: GET_REVIEWS_ERROR,
        payload: errorMessage,
      })
    }
  }
}

export const getAverageRatingAction = (songId) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token")

      const headers = {}

      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      const response = await fetch(
        `http://localhost:3001/reviews/average/${songId}`,
        {
          headers,
        },
      )

      const data = await response.json()

      if (response.ok) {
        dispatch({
          type: GET_AVERAGE_RATING,
          payload: data,
        })
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      dispatch({
        type: GET_REVIEWS_ERROR,
        payload: error.message,
      })
    }
  }
}

export const addReviewAction = (songId, rate) => {
  return async (dispatch) => {
    if (!rate || rate <= 0) {
      return
    }
    try {
      const token = localStorage.getItem("token")

      const headers = {
        "Content-Type": "application/json",
      }

      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      const response = await fetch("http://localhost:3001/reviews", {
        method: "POST",
        headers,
        body: JSON.stringify({
          songId,
          rating: Math.round(rate),
        }),
      })

      const data = await response.json()

      console.log("Risposta backend:", data)

      if (response.ok) {
        dispatch({
          type: ADD_REVIEW,
          payload: data,
        })

        dispatch(getReviewsAction(songId))
        dispatch(getAverageRatingAction(songId))
      } else if (
        response.status === 400 &&
        data.message === "You have already reviewed this song"
      ) {
        dispatch(updateReviewAction(songId, rate))
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      dispatch({
        type: ADD_REVIEW_ERROR,
        payload: error.message,
      })
    }
  }
}

export const updateReviewAction = (songId, rate) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token")

      const headers = {
        "Content-Type": "application/json",
      }

      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      const response = await fetch(`http://localhost:3001/reviews/${songId}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({
          rating: Math.round(rate),
        }),
      })

      const data = await response.json()

      console.log("update response:", data)

      if (response.ok) {
        dispatch({
          type: UPDATE_REVIEW,
          payload: data,
        })

        dispatch(getReviewsAction(songId))
        dispatch(getAverageRatingAction(songId))
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      dispatch({
        type: UPDATE_REVIEW_ERROR,
        payload: error.message,
      })
    }
  }
}

export const clearReviewErrorAction = () => {
  return {
    type: CLEAR_REVIEW_ERROR,
  }
}

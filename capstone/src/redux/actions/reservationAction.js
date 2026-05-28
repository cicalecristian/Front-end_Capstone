export const GET_RESERVATIONS = "GET_RESERVATIONS"
export const GET_RESERVATIONS_LOADING = "GET_RESERVATIONS_LOADING"
export const GET_RESERVATIONS_ERROR = "GET_RESERVATIONS_ERROR"

export const GET_SINGLE_RESERVATIONS = "GET_SINGLE_RESERVATIONS"
export const GET_SINGLE_RESERVATIONS_LOADING = "GET_SINGLE_RESERVATIONS_LOADING"
export const GET_SINGLE_RESERVATIONS_ERROR = "GET_SINGLE_RESERVATIONS_ERROR"

export const CREATE_RESERVATION = "CREATE_RESERVATION"
export const CREATE_RESERVATION_LOADING = "CREATE_RESERVATION_LOADING"
export const CREATE_RESERVATION_ERROR = "CREATE_RESERVATION_ERROR"

export const DELETE_RESERVATION = "DELETE_RESERVATION"
export const DELETE_RESERVATION_LOADING = "DELETE_RESERVATION_LOADING"
export const DELETE_RESERVATION_ERROR = "DELETE_RESERVATION_ERROR"

export const CLEAR_RESERVATION_ERROR = "CLEAR_RESERVATION_ERROR"
export const CLEAR_CURRENT_RESERVATION = "CLEAR_CURRENT_RESERVATION"

export const createReservationAction = (reservationData) => {
  return async (dispatch, getState) => {
    dispatch({ type: CREATE_RESERVATION_LOADING })

    const token = getState().auth.token

    try {
      const response = await fetch("http://localhost:3001/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reservationData),
      })

      const data = await response.json()

      if (response.ok) {
        dispatch({
          type: CREATE_RESERVATION,
          payload: data,
        })
        return true
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      let errorMessage = error.message

      if (error.message === "Failed to fetch") {
        errorMessage = "Unable to connect to the server"
      }

      dispatch({
        type: CREATE_RESERVATION_ERROR,
        payload: errorMessage,
      })
      return false
    }
  }
}

export const getReservationsAction = () => {
  return async (dispatch, getState) => {
    dispatch({ type: GET_RESERVATIONS_LOADING })

    const token = getState().auth.token

    try {
      const response = await fetch("http://localhost:3001/reservations", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (response.ok) {
        dispatch({
          type: GET_RESERVATIONS,
          payload: data,
        })
        return true
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      let errorMessage = error.message

      if (error.message === "Failed to fetch") {
        errorMessage = "Unable to connect to the server"
      }

      dispatch({
        type: GET_RESERVATIONS_ERROR,
        payload: errorMessage,
      })
      return false
    }
  }
}

export const getSingleReservationAction = (id) => {
  return async (dispatch, getState) => {
    dispatch({ type: GET_SINGLE_RESERVATIONS_LOADING })

    const token = getState().auth.token

    try {
      const response = await fetch(`http://localhost:3001/reservations/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (response.ok) {
        dispatch({
          type: GET_SINGLE_RESERVATIONS,
          payload: data,
        })
        return true
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      let errorMessage = error.message

      if (error.message === "Failed to fetch") {
        errorMessage = "Unable to connect to the server"
      }

      dispatch({
        type: GET_SINGLE_RESERVATIONS_ERROR,
        payload: errorMessage,
      })
      return false
    }
  }
}

export const deleteReservationAction = (id) => {
  return async (dispatch, getState) => {
    dispatch({ type: DELETE_RESERVATION_LOADING })

    const token = getState().auth.token

    try {
      const response = await fetch(`http://localhost:3001/reservations/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        dispatch({
          type: DELETE_RESERVATION,
          payload: id,
        })
        return true
      } else {
        const data = await response.json()
        throw new Error(data.message)
      }
    } catch (error) {
      let errorMessage = error.message

      if (error.message === "Failed to fetch") {
        errorMessage = "Unable to connect to the server"
      }

      dispatch({
        type: DELETE_RESERVATION_ERROR,
        payload: errorMessage,
      })
      return false
    }
  }
}

export const clearReservationErrorAction = () => {
  return { type: CLEAR_RESERVATION_ERROR }
}

export const clearCurrentReservationAction = () => {
  return { type: CLEAR_CURRENT_RESERVATION }
}

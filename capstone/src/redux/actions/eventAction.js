export const GET_EVENTS = "GET_EVENTS"
export const GET_EVENTS_LOADING = "GET_EVENTS_LOADING"
export const GET_EVENTS_ERROR = "GET_EVENTS_ERROR"
export const CLEAR_EVENT_ERROR = "CLEAR_EVENT_ERROR"
export const GET_SINGLE_EVENT = "GET_SINGLE_EVENT"
export const GET_SINGLE_EVENT_LOADING = "GET_SINGLE_EVENT_LOADING"
export const GET_SINGLE_EVENT_ERROR = "GET_SINGLE_EVENT_ERROR"

export const getEventsAction = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_EVENTS_LOADING,
    })

    try {
      const token = localStorage.getItem("token")

      const headers = {}

      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      const response = await fetch("http://localhost:3001/events", {
        headers,
      })

      const data = await response.json()

      if (response.ok) {
        dispatch({
          type: GET_EVENTS,
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
        type: GET_EVENTS_ERROR,
        payload: errorMessage,
      })
    }
  }
}

export const clearEventErrorAction = () => {
  return {
    type: CLEAR_EVENT_ERROR,
  }
}

export const getSingleEventAction = (id) => {
  return async (dispatch) => {
    dispatch({
      type: GET_SINGLE_EVENT_LOADING,
    })

    try {
      const token = localStorage.getItem("token")

      const headers = {}

      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      const response = await fetch(`http://localhost:3001/events/${id}`, {
        headers,
      })

      const data = await response.json()

      if (response.ok) {
        dispatch({
          type: GET_SINGLE_EVENT,
          payload: data,
        })
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      dispatch({
        type: GET_SINGLE_EVENT_ERROR,
        payload: error.message,
      })
    }
  }
}

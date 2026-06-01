export const GET_EVENTS = "GET_EVENTS"
export const GET_EVENTS_LOADING = "GET_EVENTS_LOADING"
export const GET_EVENTS_ERROR = "GET_EVENTS_ERROR"
export const CLEAR_EVENT_ERROR = "CLEAR_EVENT_ERROR"
export const GET_SINGLE_EVENT = "GET_SINGLE_EVENT"
export const GET_SINGLE_EVENT_LOADING = "GET_SINGLE_EVENT_LOADING"
export const GET_SINGLE_EVENT_ERROR = "GET_SINGLE_EVENT_ERROR"
export const CREATE_EVENT = "CREATE_EVENT"
export const CREATE_EVENT_LOADING = "CREATE_EVENT_LOADING"
export const CREATE_EVENT_ERROR = "CREATE_EVENT_ERROR"
export const UPDATE_EVENT = "UPDATE_EVENT"
export const UPDATE_EVENT_LOADING = "UPDATE_EVENT_LOADING"
export const UPDATE_EVENT_ERROR = "UPDATE_EVENT_ERROR"
export const DELETE_EVENT = "DELETE_EVENT"
export const DELETE_EVENT_LOADING = "DELETE_EVENT_LOADING"
export const DELETE_EVENT_ERROR = "DELETE_EVENT_ERROR"

export const getEventsAction = (size = 10) => {
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

      const response = await fetch(
        `http://localhost:3001/events?size=${size}`,
        {
          headers,
        },
      )

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

export const createEventAction = (eventData) => {
  return async (dispatch) => {
    dispatch({
      type: CREATE_EVENT_LOADING,
    })

    try {
      const token = localStorage.getItem("token")

      const headers = {
        "Content-Type": "application/json",
      }

      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      const response = await fetch("http://localhost:3001/events", {
        method: "POST",
        headers,
        body: JSON.stringify(eventData),
      })

      const data = await response.json()

      if (response.ok) {
        dispatch({
          type: CREATE_EVENT,
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
        type: CREATE_EVENT_ERROR,
        payload: errorMessage,
      })

      return false
    }
  }
}

export const updateEventAction = (id, eventData) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_EVENT_LOADING })

    try {
      const token = localStorage.getItem("token")

      const response = await fetch(`http://localhost:3001/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message)
      }

      dispatch({
        type: UPDATE_EVENT,
        payload: data,
      })

      return true
    } catch (error) {
      dispatch({
        type: UPDATE_EVENT_ERROR,
        payload:
          error.message === "Failed to fetch"
            ? "Unable to connect to the server"
            : error.message,
      })

      return false
    }
  }
}

export const deleteEventAction = (id) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_EVENT_LOADING })

    try {
      const token = localStorage.getItem("token")

      const response = await fetch(`http://localhost:3001/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message)
      }

      dispatch({
        type: DELETE_EVENT,
        payload: id,
      })

      return true
    } catch (error) {
      dispatch({
        type: DELETE_EVENT_ERROR,
        payload:
          error.message === "Failed to fetch"
            ? "Unable to connect to the server"
            : error.message,
      })

      return false
    }
  }
}

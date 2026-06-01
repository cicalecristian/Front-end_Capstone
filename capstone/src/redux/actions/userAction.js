export const GET_USERS = "GET_USERS"
export const GET_USERS_LOADING = "GET_USERS_LOADING"
export const GET_USERS_ERROR = "GET_USERS_ERROR"

export const DELETE_USER = "DELETE_USER"
export const DELETE_USER_LOADING = "DELETE_USER_LOADING"
export const DELETE_USER_ERROR = "DELETE_USER_ERROR"

export const CHANGE_ROLE = "CHANGE_ROLE"
export const CHANGE_ROLE_LOADING = "CHANGE_ROLE_LOADING"
export const CHANGE_ROLE_ERROR = "CHANGE_ROLE_ERROR"

export const CLEAR_ADMIN_USERS_ERROR = "CLEAR_ADMIN_USERS_ERROR"

export const getUsersAction = () => {
  return async (dispatch, getState) => {
    dispatch({ type: GET_USERS_LOADING })

    const token = getState().auth.token

    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (response.ok) {
        dispatch({ type: GET_USERS, payload: data })
        return true
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      dispatch({
        type: GET_USERS_ERROR,
        payload:
          error.message === "Failed to fetch"
            ? "Unable to connect to the server"
            : error.message,
      })
      return false
    }
  }
}

export const deleteUserAction = (userId) => {
  return async (dispatch, getState) => {
    dispatch({ type: DELETE_USER_LOADING })

    const token = getState().auth.token

    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        dispatch({ type: DELETE_USER, payload: userId })
        return true
      } else {
        const data = await response.json()
        throw new Error(data.message)
      }
    } catch (error) {
      dispatch({
        type: DELETE_USER_ERROR,
        payload:
          error.message === "Failed to fetch"
            ? "Unable to connect to the server"
            : error.message,
      })
      return false
    }
  }
}

export const changeRoleAction = (userId, roleUser) => {
  return async (dispatch, getState) => {
    dispatch({ type: CHANGE_ROLE_LOADING })

    const token = getState().auth.token

    try {
      const response = await fetch(
        `http://localhost:3001/users/${userId}/role?roleUser=${roleUser}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const data = await response.json()

      if (response.ok) {
        dispatch({ type: CHANGE_ROLE, payload: data })
        return true
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      dispatch({
        type: CHANGE_ROLE_ERROR,
        payload:
          error.message === "Failed to fetch"
            ? "Unable to connect to the server"
            : error.message,
      })
      return false
    }
  }
}

export const clearAdminUsersErrorAction = () => {
  return { type: CLEAR_ADMIN_USERS_ERROR }
}

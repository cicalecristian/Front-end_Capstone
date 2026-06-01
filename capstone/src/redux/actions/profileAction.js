export const GET_PROFILE = "GET_PROFILE"
export const GET_PROFILE_LOADING = "GET_PROFILE_LOADING"
export const GET_PROFILE_ERROR = "GET_PROFILE_ERROR"

export const UPDATE_PROFILE = "UPDATE_PROFILE"
export const UPDATE_PROFILE_LOADING = "UPDATE_PROFILE_LOADING"
export const UPDATE_PROFILE_ERROR = "UPDATE_PROFILE_ERROR"

export const DELETE_PROFILE = "DELETE_PROFILE"
export const DELETE_PROFILE_LOADING = "DELETE_PROFILE_LOADING"
export const DELETE_PROFILE_ERROR = "DELETE_PROFILE_ERROR"

export const UPDATE_AVATAR = "UPDATE_AVATAR"
export const UPDATE_AVATAR_LOADING = "UPDATE_AVATAR_LOADING"
export const UPDATE_AVATAR_ERROR = "UPDATE_AVATAR_ERROR"

export const CLEAR_PROFILE_ERROR = "CLEAR_PROFILE_ERROR"

export const getProfileAction = () => {
  return async (dispatch, getState) => {
    dispatch({ type: GET_PROFILE_LOADING })

    const token = getState().auth.token

    try {
      const response = await fetch("http://localhost:3001/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (response.ok) {
        dispatch({ type: GET_PROFILE, payload: data })
        return true
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      dispatch({
        type: GET_PROFILE_ERROR,
        payload:
          error.message === "Failed to fetch"
            ? "Unable to connect to the server"
            : error.message,
      })
      return false
    }
  }
}

export const updateProfileAction = (profileData) => {
  return async (dispatch, getState) => {
    dispatch({ type: UPDATE_PROFILE_LOADING })

    const token = getState().auth.token

    const body = { ...profileData }
    if (!body.password || body.password.trim() === "") {
      delete body.password
    }

    console.log("body inviato:", JSON.stringify(body))

    try {
      const response = await fetch("http://localhost:3001/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      })

      const data = await response.json()

      if (response.ok) {
        dispatch({ type: UPDATE_PROFILE, payload: data })
        return true
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      dispatch({
        type: UPDATE_PROFILE_ERROR,
        payload:
          error.message === "Failed to fetch"
            ? "Unable to connect to the server"
            : error.message,
      })
      return false
    }
  }
}

export const deleteProfileAction = () => {
  return async (dispatch, getState) => {
    dispatch({ type: DELETE_PROFILE_LOADING })

    const token = getState().auth.token

    try {
      const response = await fetch("http://localhost:3001/users/me", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        dispatch({ type: DELETE_PROFILE })
        return true
      } else {
        const data = await response.json()
        throw new Error(data.message)
      }
    } catch (error) {
      dispatch({
        type: DELETE_PROFILE_ERROR,
        payload:
          error.message === "Failed to fetch"
            ? "Unable to connect to the server"
            : error.message,
      })
      return false
    }
  }
}

export const updateAvatarAction = (file) => {
  return async (dispatch, getState) => {
    dispatch({ type: UPDATE_AVATAR_LOADING })

    const token = getState().auth.token
    const formData = new FormData()
    formData.append("avatar", file)

    try {
      const response = await fetch("http://localhost:3001/users/avatar", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        dispatch({ type: UPDATE_AVATAR, payload: data })
        return true
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      dispatch({
        type: UPDATE_AVATAR_ERROR,
        payload:
          error.message === "Failed to fetch"
            ? "Unable to connect to the server"
            : error.message,
      })
      return false
    }
  }
}

export const clearProfileErrorAction = () => {
  return { type: CLEAR_PROFILE_ERROR }
}

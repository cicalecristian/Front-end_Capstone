export const LOGIN = "LOGIN"
export const LOGIN_LOADING = "LOGIN_LOADING"
export const LOGIN_ERROR = "LOGIN_ERROR"

export const REGISTER = "REGISTER"
export const REGISTER_LOADING = "REGISTER_LOADING"
export const REGISTER_ERROR = "REGISTER_ERROR"

export const LOGOUT = "LOGOUT"

export const loginAction = (credentials) => {
  return async (dispatch) => {
    dispatch({
      type: LOGIN_LOADING,
    })

    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(credentials),
      })

      if (response.ok) {
        const data = await response.json()

        localStorage.setItem("token", data.token)

        dispatch({
          type: LOGIN,
          payload: data.token,
        })
      } else {
        throw new Error("Errore login")
      }
    } catch (error) {
      console.log(error)

      dispatch({
        type: LOGIN_ERROR,
      })
    }
  }
}

export const registerAction = (userData) => {
  return async (dispatch) => {
    dispatch({
      type: REGISTER_LOADING,
    })

    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(userData),
      })

      if (response.ok) {
        dispatch({
          type: REGISTER,
        })
      } else {
        throw new Error("Errore registrazione")
      }
    } catch (error) {
      console.log(error)

      dispatch({
        type: REGISTER_ERROR,
      })
    }
  }
}

export const logoutAction = () => {
  localStorage.removeItem("token")

  return {
    type: LOGOUT,
  }
}

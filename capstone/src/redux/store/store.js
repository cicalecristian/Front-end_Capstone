import { configureStore } from "@reduxjs/toolkit"

import authReducer from "../reducers/authReducer"
import songReducer from "../reducers/songReducer"

const store = configureStore({
  reducer: {
    auth: authReducer,
    songs: songReducer,
  },
})

export default store

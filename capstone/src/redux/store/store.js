import { configureStore } from "@reduxjs/toolkit"

import authReducer from "../reducers/authReducer"
import songReducer from "../reducers/songReducer"
import artistReducer from "../reducers/artistReducer"
import eventReducer from "../reducers/eventReducer"

const store = configureStore({
  reducer: {
    auth: authReducer,
    songs: songReducer,
    artists: artistReducer,
    events: eventReducer,
  },
})

export default store

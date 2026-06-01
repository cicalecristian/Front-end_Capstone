import { configureStore } from "@reduxjs/toolkit"

import authReducer from "../reducers/authReducer"
import songReducer from "../reducers/songReducer"
import artistReducer from "../reducers/artistReducer"
import eventReducer from "../reducers/eventReducer"
import favoriteReducer from "../reducers/favoriteReducer"
import reviewReducer from "../reducers/reviewReducer"
import reservationReducer from "../reducers/reservationReducer"
import profileReducer from "../reducers/profileReducer"

const store = configureStore({
  reducer: {
    auth: authReducer,
    songs: songReducer,
    artists: artistReducer,
    events: eventReducer,
    favorites: favoriteReducer,
    reviews: reviewReducer,
    reservations: reservationReducer,
    profile: profileReducer,
  },
})

export default store

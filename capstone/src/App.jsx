import LoginPage from "./components/auth/LoginPage.jsx"
import { Provider } from "react-redux"
import store from "./redux/store/store.js"
import { Route, Routes } from "react-router-dom"
import RegisterPage from "./components/auth/RegisterPage.jsx"
import Home from "./components/pages/Home.jsx"
import SongDetails from "./components/pages/SongDetails/SongDetails.jsx"
import ArtistDetails from "./components/pages/ArtistDetails/ArtistDetails.jsx"
import EventDetails from "./components/pages/EventDetails/EventDetails.jsx"
import FavoritesPage from "./components/pages/FavoritePage/FavoritePage.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/songs/:id" element={<SongDetails />} />
          <Route path="/artists/:id" element={<ArtistDetails />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Route>
      </Routes>
    </Provider>
  )
}

export default App

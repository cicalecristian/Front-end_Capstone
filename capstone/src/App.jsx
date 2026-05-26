import LoginPage from "./components/LoginPage"
import { Provider } from "react-redux"
import store from "./redux/store/store.js"
import { Route, Routes } from "react-router-dom"
import RegisterPage from "./components/RegisterPage.jsx"
import Home from "./components/Home.jsx"
import SongDetails from "./components/SongDetails.jsx"
import ArtistDetails from "./components/ArtistDetails.jsx"
import EventDetails from "./components/EventDetails.jsx"
import FavoritesPage from "./components/FavoritePage.jsx"

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/songs/:id" element={<SongDetails />} />
        <Route path="/artists/:id" element={<ArtistDetails />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </Provider>
  )
}

export default App

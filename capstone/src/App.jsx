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
import SearchPage from "./components/pages/SearchPage/SearchPage.jsx"
import ProfilePage from "./components/pages/ProfilePage/ProfilePage.jsx"
import EditProfile from "./components/pages/ProfilePage/editProfile/editProfile.jsx"
import AdminUsers from "./components/pages/ProfilePage/AdminUsers/AdminUsers.jsx"
import AdminReservations from "./components/pages/ProfilePage/AdminReservations/AdminReservations.jsx"
import CreateEvent from "./components/pages/ProfilePage/CreateEvent/CreateEvent.jsx"
import MainLayout from "./components/layout/MainLayout.jsx"
import ScrollToTop from "./components/layout/ScrollToTop.jsx"
import ReservationPage from "./components/pages/ReservationPage/ReservationPage.jsx"
import ErrorPage from "./components/pages/ErrorPage/ErrorPage.jsx"

function App() {
  return (
    <Provider store={store}>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<ErrorPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/songs/:id" element={<SongDetails />} />
            <Route path="/artists/:id" element={<ArtistDetails />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/reservations" element={<AdminReservations />} />
            <Route path="/admin/content" element={<CreateEvent />} />
            <Route path="/reservations" element={<ReservationPage />} />
          </Route>
        </Route>
      </Routes>
    </Provider>
  )
}

export default App

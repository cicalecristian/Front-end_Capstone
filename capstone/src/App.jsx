import LoginPage from "./components/LoginPage"
import { Provider } from "react-redux"
import store from "./redux/store/store.js"
import { Route, Routes } from "react-router-dom"
import RegisterPage from "./components/RegisterPage.jsx"
import Home from "./components/Home.jsx"
import SongDetails from "./components/SongDetails.jsx"

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/songs/:id" element={<SongDetails />} />
      </Routes>
    </Provider>
  )
}

export default App

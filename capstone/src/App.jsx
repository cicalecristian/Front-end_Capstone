import LoginPage from "./components/LoginPage"
import { Provider } from "react-redux"
import store from "./redux/store/store.js"
import { Container } from "react-bootstrap"
import { Route, Routes } from "react-router-dom"
import RegisterPage from "./components/RegisterPage.jsx"

function App() {
  return (
    <>
      <Provider store={store}>
        <Container>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Container>
      </Provider>
    </>
  )
}

export default App

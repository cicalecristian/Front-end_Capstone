import LoginPage from "./components/LoginPage"
import { Provider } from "react-redux"
import store from "./redux/store/store.js"

function App() {
  return (
    <Provider store={store}>
      <LoginPage />
    </Provider>
  )
}

export default App

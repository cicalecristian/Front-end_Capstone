import { Outlet } from "react-router-dom"
import Navbar from "../layout/navbar/Navbar"
import Footer from "../layout/footer/Footer"

const MainLayout = () => {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  )
}

export default MainLayout

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  loginAction,
  clearErrorAction,
} from "../../redux/actions/authAction.js"
import { Button, Col, Form, Row, Spinner } from "react-bootstrap"
import { FaFacebookF } from "react-icons/fa"
import { FaTwitter } from "react-icons/fa"
import { FaGoogle } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { FaCircleExclamation } from "react-icons/fa6"
import "./auth.css"
import { FaEye, FaEyeSlash } from "react-icons/fa6"

const LoginPage = () => {
  const dispatch = useDispatch()
  const error = useSelector((state) => state.auth.error)
  const loading = useSelector((state) => state.auth.loading)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const success = await dispatch(loginAction(formData))

    if (success) {
      navigate("/home")
    }
  }

  const token = localStorage.getItem("token")

  useEffect(() => {
    if (token) {
      navigate("/home")
    }
  }, [])

  return (
    <Row className=" min-vh-100 align-items-center justify-content-center g-0">
      <Col xs={11} sm={9} md={7} lg={5}>
        <div className=" input bg-dark d-flex flex-column align-items-center rounded-4">
          <h2 className=" text-white mt-5">LOGIN</h2>
          <p className=" text-secondary mb-5 mt-2 fw-semibold">
            please enter your email and password
          </p>
          <Form
            onSubmit={handleSubmit}
            className=" d-flex flex-column gap-3 w-75"
            style={{ maxWidth: "500px" }}
          >
            <div className=" d-flex flex-column">
              <input
                className={`form-control bg-dark text-white custom-input py-2 ${
                  error ? "border-danger" : ""
                }`}
                style={{
                  boxShadow: "none",
                }}
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => {
                  dispatch(clearErrorAction())

                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }}
              />

              <br />

              <div className="position-relative">
                <input
                  className={`form-control bg-dark text-white custom-input py-2 ${
                    error ? "border-danger" : ""
                  }`}
                  style={{ boxShadow: "none" }}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => {
                    dispatch(clearErrorAction())
                    setFormData({ ...formData, password: e.target.value })
                  }}
                />
                <button
                  type="button"
                  className="position-absolute top-50 end-0 translate-middle-y border-0 bg-transparent text-white pe-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <a
              href="#"
              className=" text-secondary text-center text-decoration-none mt-2 d-inline"
            >
              Forgot password?
            </a>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "40px" }}
            >
              {loading ? (
                <Spinner animation="border" style={{ color: "#67e8f9" }} />
              ) : error ? (
                <div className="text-danger fw-semibold small d-flex align-items-center gap-2">
                  <FaCircleExclamation />
                  {error}
                </div>
              ) : null}
            </div>
            <Button
              type="submit"
              className="btn-dark border-white border-2 align-self-center px-4 py-2 hover-primary"
            >
              LOGIN
            </Button>
          </Form>
          <div className=" my-5 d-flex gap-3">
            <Button className=" bg-transparent border-0">
              <FaFacebookF className=" text-white fs-5" />
            </Button>
            <Button className=" bg-transparent border-0">
              <FaTwitter className=" text-white fs-5" />
            </Button>
            <Button className=" bg-transparent border-0">
              <FaGoogle className=" text-white fs-5" />
            </Button>
          </div>
          <p className=" text-white fw-semibold mb-5">
            Don't have an account?{" "}
            <Link
              to={"/register"}
              className=" text-decoration-none text-secondary fw-bold"
            >
              Sign up
            </Link>
          </p>
        </div>
      </Col>
    </Row>
  )
}

export default LoginPage

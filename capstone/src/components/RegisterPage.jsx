import { useDispatch, useSelector } from "react-redux"
import { clearErrorAction, registerAction } from "../redux/actions/authAction"
import { Link, useNavigate } from "react-router-dom"
import { Button, Col, Form, Row, Spinner } from "react-bootstrap"
import { FaCircleExclamation } from "react-icons/fa6"
import { useState } from "react"

const RegisterPage = () => {
  const dispatch = useDispatch()
  const error = useSelector((state) => state.auth.error)
  const loading = useSelector((state) => state.auth.loading)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    surname: "",
    dateOfBirth: "",
    avatar: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const success = await dispatch(registerAction(formData))

    if (success) {
      navigate("/")
    }
  }

  return (
    <Row className=" min-vh-100 align-items-center justify-content-center g-0">
      <Col xs={11} sm={9} md={7} lg={5}>
        <div className=" bg-dark d-flex flex-column align-items-center rounded-4">
          <h2 className=" text-white mt-5">REGISTER</h2>
          <p className=" text-secondary mb-5 mt-2 fw-semibold">
            please enter your credentials
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
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => {
                  dispatch(clearErrorAction())

                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }}
              />

              <br />

              <input
                className={`form-control bg-dark text-white custom-input py-2 ${
                  error ? "border-danger" : ""
                }`}
                style={{
                  boxShadow: "text",
                }}
                type="text"
                placeholder="Surname"
                value={formData.surname}
                onChange={(e) => {
                  dispatch(clearErrorAction())

                  setFormData({
                    ...formData,
                    surname: e.target.value,
                  })
                }}
              />

              <br />

              <input
                className={`form-control bg-dark text-white custom-input py-2 ${
                  error ? "border-danger" : ""
                }`}
                style={{
                  boxShadow: "none",
                }}
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => {
                  dispatch(clearErrorAction())

                  setFormData({
                    ...formData,
                    username: e.target.value,
                  })
                }}
              />

              <br />

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

              <input
                className={`form-control bg-dark text-white custom-input py-2 ${
                  error ? "border-danger" : ""
                }`}
                style={{ boxShadow: "none" }}
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => {
                  dispatch(clearErrorAction())

                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }}
              />

              <br />

              <input
                className={`form-control bg-dark text-white custom-input py-2 ${
                  error ? "border-danger" : ""
                }`}
                style={{ boxShadow: "none" }}
                type="date"
                placeholder="Date of birth"
                value={formData.dateOfBirth}
                onChange={(e) => {
                  dispatch(clearErrorAction())

                  setFormData({
                    ...formData,
                    dateOfBirth: e.target.value,
                  })
                }}
              />

              <br />

              <input
                className={`form-control bg-dark text-white custom-input py-2 ${
                  error ? "border-danger" : ""
                }`}
                style={{
                  boxShadow: "none",
                }}
                type="url"
                placeholder="Avatar"
                value={formData.avatar}
                onChange={(e) => {
                  dispatch(clearErrorAction())

                  setFormData({
                    ...formData,
                    avatar: e.target.value,
                  })
                }}
              />
            </div>
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
              className="btn-dark border-white border-2 hover-primary align-self-center px-4 py-2"
            >
              SIGN UP
            </Button>
          </Form>
          <p className=" text-white fw-semibold my-5">
            Already have an account?{" "}
            <Link
              to={"/"}
              className=" text-decoration-none text-secondary fw-bold"
            >
              Login
            </Link>
          </p>
        </div>
      </Col>
    </Row>
  )
}

export default RegisterPage

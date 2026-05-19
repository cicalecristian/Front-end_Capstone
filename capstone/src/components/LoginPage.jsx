import { useState } from "react"
import { useDispatch } from "react-redux"
import { loginAction } from "../redux/actions/authAction.js"
import { Button, Col, Container, Form, Row } from "react-bootstrap"

const LoginPage = () => {
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(loginAction(formData))
  }

  return (
    <Container>
      <Row>
        <Col>
          <div className=" bg-dark d-flex flex-column align-items-center">
            <h1 className=" text-white">LOGIN</h1>
            <p className=" text-secondary">
              please enter your login and password
            </p>
            <Form
              onSubmit={handleSubmit}
              className=" d-flex flex-column gap-3 w-75"
            >
              <div className=" d-flex flex-column">
                <input
                  className="form-control"
                  style={{
                    boxShadow: "none",
                  }}
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,

                      email: e.target.value,
                    })
                  }
                />

                <br />

                <input
                  className="form-control"
                  style={{ boxShadow: "none" }}
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,

                      password: e.target.value,
                    })
                  }
                />
              </div>
              <a
                href="#"
                className=" text-secondary text-center text-decoration-none"
              >
                Forgot password?
              </a>

              <Button
                type="submit"
                className="btn-dark border-white border-2 hover-primary align-self-center px-4"
              >
                LOGIN
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage

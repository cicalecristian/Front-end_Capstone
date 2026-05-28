import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getSingleEventAction } from "../../../redux/actions/eventAction"
import { Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Spinner } from "react-bootstrap"
import { FaCircleExclamation } from "react-icons/fa6"
import "./EventDetails.css"

const EventDetails = () => {
  const dispatch = useDispatch()

  const { id } = useParams()
  const event = useSelector((state) => state.events.singleEvent)
  const error = useSelector((state) => state.events.error)
  const loading = useSelector((state) => state.events.loading)

  useEffect(() => {
    dispatch(getSingleEventAction(id))
  }, [dispatch, id])

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" className="custom-spinner" />
        <p className="loading-text">Just Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div className="text-danger fw-semibold d-flex align-items-center gap-2 fs-5 bg-info p-3 rounded-3 error-box">
          <FaCircleExclamation />
          {error}
        </div>
      </div>
    )
  }

  if (!event) {
    return null
  }

  return (
    <Container fluid className="event-page p-0 overflow-hidden">
      <Row className="justify-content-center align-items-center min-vh-100 px-3">
        <Col xs={12} lg={10} xl={9}>
          <div className="event-card-wrapper">
            <Row className="g-0 align-items-center">
              <Col xs={12} md={5} className=" d-flex">
                <img
                  src={event.cover}
                  alt={event.title}
                  className="event-poster"
                />
              </Col>

              <Col xs={12} md={7}>
                <div className="event-content">
                  <p className="event-badge">LIVE EVENT</p>

                  <h1 className="event-details-title">{event.title}</h1>

                  <Link
                    to={`/artists/${event.artistId}`}
                    className="text-decoration-none"
                  >
                    <h3 className="event-artist">{event.artistName}</h3>
                  </Link>

                  <div className="event-meta">
                    <div>
                      <span className="event-label">CITY</span>

                      <p>
                        {event.city}, {event.country}
                      </p>
                    </div>

                    <div>
                      <span className="event-label">DATE</span>

                      <p>{event.date}</p>
                    </div>

                    <div>
                      <span className="event-label">SEATS</span>

                      <p>{event.seat}</p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default EventDetails

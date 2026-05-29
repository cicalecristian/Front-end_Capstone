import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getSingleEventAction } from "../../../redux/actions/eventAction"
import {
  createReservationAction,
  clearReservationErrorAction,
} from "../../../redux/actions/reservationAction"
import { Container, Row, Col, Spinner, Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { FaCircleExclamation } from "react-icons/fa6"
import "./EventDetails.css"

const EventDetails = () => {
  const dispatch = useDispatch()

  const { id } = useParams()
  const event = useSelector((state) => state.events.singleEvent)
  const error = useSelector((state) => state.events.error)
  const loading = useSelector((state) => state.events.loading)

  const reservationLoading = useSelector((state) => state.reservations.loading)
  const reservationError = useSelector((state) => state.reservations.error)

  const [tickets, setTickets] = useState(1)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [showConfirmToast, setShowConfirmToast] = useState(false)
  const [pendingTickets, setPendingTickets] = useState(1)

  useEffect(() => {
    dispatch(getSingleEventAction(id))
  }, [dispatch, id])

  useEffect(() => {
    return () => {
      dispatch(clearReservationErrorAction())
    }
  }, [dispatch])

  const handleReservation = (e) => {
    e.preventDefault()
    setBookingSuccess(false)
    setPendingTickets(tickets)
    setShowConfirmToast(true)
  }

  const confirmReservation = async () => {
    try {
      const success = await dispatch(
        createReservationAction({ eventId: id, tickets: pendingTickets }),
      )

      if (success) {
        await dispatch(getSingleEventAction(id))
        setBookingSuccess(true)
        setTickets(1)
      }
    } finally {
      setShowConfirmToast(false)
    }
  }

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
      {showConfirmToast && (
        <div className="reservation-confirm-overlay">
          <div className="reservation-confirm-toast">
            <p className="event-label mb-2">CONFIRM RESERVATION</p>

            <h4 className="reservation-confirm-title">
              Confirm your reservation?
            </h4>

            <p className="reservation-confirm-text">
              You are reserving {pendingTickets}{" "}
              {pendingTickets === 1 ? "ticket" : "tickets"} for {event.title}.
            </p>

            <div className="reservation-confirm-actions">
              <Button
                type="button"
                variant="custom"
                className="reservation-confirm-btn confirm-no"
                onClick={() => setShowConfirmToast(false)}
                disabled={reservationLoading}
              >
                NO
              </Button>

              <Button
                type="button"
                variant="custom"
                className="reservation-confirm-btn confirm-yes"
                onClick={confirmReservation}
                disabled={reservationLoading}
              >
                {reservationLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "YES"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
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

                  <div className="reservation-form-wrapper">
                    <p className="event-label mb-3">BOOK TICKETS</p>

                    <Form
                      onSubmit={handleReservation}
                      className="reservation-form"
                    >
                      {bookingSuccess && (
                        <div className="reservation-success">
                          <span>Booking confirmed!</span>
                        </div>
                      )}

                      <div className="tickets-control">
                        <Button
                          type="button"
                          variant="custom"
                          className="tickets-btn"
                          onClick={() => setTickets((t) => Math.max(1, t - 1))}
                          disabled={tickets <= 1}
                        >
                          −
                        </Button>

                        <span className="tickets-count">{tickets}</span>

                        <Button
                          type="button"
                          variant="custom"
                          className="tickets-btn"
                          onClick={() =>
                            setTickets((t) =>
                              Math.min(Math.min(event.seat, 4), t + 1),
                            )
                          }
                          disabled={tickets >= Math.min(event.seat, 4)}
                        >
                          +
                        </Button>
                      </div>

                      {reservationError && (
                        <div className="reservation-error">
                          <FaCircleExclamation />
                          <span>{reservationError}</span>
                        </div>
                      )}

                      <Button
                        type="submit"
                        variant="custom"
                        className="reservation-submit"
                        disabled={reservationLoading || event.seat === 0}
                      >
                        {reservationLoading ? (
                          <Spinner animation="border" size="sm" />
                        ) : event.seat === 0 ? (
                          "SOLD OUT"
                        ) : (
                          "RESERVE NOW"
                        )}
                      </Button>
                    </Form>
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

import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getReservationsAction,
  deleteReservationAction,
} from "../../../redux/actions/reservationAction"
import { Spinner } from "react-bootstrap"
import { FaCircleExclamation } from "react-icons/fa6"
import "./ReservationPage.css"

const ReservationPage = () => {
  const dispatch = useDispatch()

  const {
    reservations = [],
    loading,
    error,
  } = useSelector((state) => state.reservations)

  const currentUser = useSelector((state) => state.auth.user)

  const [reservationToDelete, setReservationToDelete] = useState(null)

  const currentUserId = currentUser?.id ?? currentUser?.userId

  const visibleReservations = useMemo(() => {
    if (!currentUserId) return []

    return reservations.filter(
      (res) => String(res.userId) === String(currentUserId),
    )
  }, [reservations, currentUserId])

  useEffect(() => {
    dispatch(getReservationsAction())
  }, [dispatch])

  const handleDelete = (reservation) => {
    setReservationToDelete(reservation)
  }

  const handleCancelDelete = () => {
    setReservationToDelete(null)
  }

  const handleConfirmDelete = async () => {
    if (!reservationToDelete?.id) return

    await dispatch(deleteReservationAction(reservationToDelete.id))
    setReservationToDelete(null)
  }

  if (loading && visibleReservations.length === 0) {
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

  return (
    <div className="my-reservations">
      <h2 className="my-reservations__heading">
        My <span>reservations</span>
      </h2>

      <p className="my-reservations__meta">
        {visibleReservations.length} reservation
        {visibleReservations.length === 1 ? "" : "s"} found
      </p>

      {visibleReservations.length === 0 ? (
        <p className="my-reservations__empty">No reservations found.</p>
      ) : (
        <div className="my-reservations__grid">
          {visibleReservations.map((res) => (
            <div key={res.id} className="my-reservations__card">
              <div className="my-reservations__card-left">
                <div className="my-reservations__icon">🎟️</div>

                <div className="my-reservations__info">
                  <p className="my-reservations__name">
                    Event ID: {res.eventId}
                  </p>

                  <p className="my-reservations__sub">Reservation: {res.id}</p>
                </div>
              </div>

              <div className="my-reservations__details">
                <span className="my-reservations__badge">
                  {res.tickets} {res.tickets === 1 ? "ticket" : "tickets"}
                </span>

                <span className="my-reservations__date">
                  {new Date(res.createdAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="my-reservations__actions">
                <button
                  type="button"
                  className="my-reservations__delete-btn"
                  onClick={() => handleDelete(res)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {reservationToDelete && (
        <div className="confirm-overlay">
          <div className="confirm-toast">
            <p className="confirm-toast__label">CONFIRM DELETION</p>

            <h4 className="confirm-toast__title">Delete reservation?</h4>

            <p className="confirm-toast__text">
              You are about to cancel the reservation{" "}
              <strong>#{reservationToDelete.id}</strong>. This action is
              irreversible.
            </p>

            <div className="confirm-toast__actions">
              <button
                type="button"
                className="profile-btn profile-btn--ghost"
                onClick={handleCancelDelete}
                disabled={loading}
              >
                Cancel
              </button>

              <button
                type="button"
                className="profile-btn profile-btn--danger"
                onClick={handleConfirmDelete}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReservationPage

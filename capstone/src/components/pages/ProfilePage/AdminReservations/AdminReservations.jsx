import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Spinner } from "react-bootstrap"
import { FaCircleExclamation } from "react-icons/fa6"
import {
  getReservationsAction,
  deleteReservationAction,
} from "../../../../redux/actions/reservationAction"
import "./AdminReservations.css"

const AdminReservations = () => {
  const dispatch = useDispatch()

  const { reservations, loading, error } = useSelector(
    (state) => state.reservations,
  )

  const [reservationToDelete, setReservationToDelete] = useState(null)

  useEffect(() => {
    dispatch(getReservationsAction())
  }, [dispatch])

  const reservationList = Array.isArray(reservations)
    ? reservations
    : (reservations?.content ?? [])

  const handleConfirmDelete = async () => {
    if (!reservationToDelete) return

    const ok = await dispatch(deleteReservationAction(reservationToDelete.id))

    if (ok) {
      setReservationToDelete(null)
    }
  }

  if (loading && reservationList.length === 0) {
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
    <div className="admin-reservations">
      <h1 className="admin-reservations__heading">
        Gestisci <span>prenotazioni</span>
      </h1>

      <p className="admin-reservations__meta">ADMIN · RESERVATIONS</p>

      {reservationList.length === 0 ? (
        <p className="admin-reservations__empty">
          Nessuna prenotazione trovata.
        </p>
      ) : (
        <div className="admin-reservations__grid">
          {reservationList.map((reservation) => (
            <div className="admin-reservations__card" key={reservation.id}>
              <div className="admin-reservations__card-left">
                <div className="admin-reservations__icon">🎟️</div>

                <div className="admin-reservations__info">
                  <p className="admin-reservations__name">
                    Prenotazione #{reservation.id}
                  </p>

                  <p className="admin-reservations__sub">
                    User ID: {reservation.userId} · Event ID:{" "}
                    {reservation.eventId}
                  </p>

                  <div className="admin-reservations__details">
                    <span className="admin-reservations__badge">
                      {reservation.tickets} ticket
                    </span>

                    <span className="admin-reservations__date">
                      {new Date(reservation.createdAt).toLocaleDateString(
                        "it-IT",
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="admin-reservations__actions">
                <button
                  className="profile-btn profile-btn--danger"
                  onClick={() => setReservationToDelete(reservation)}
                  disabled={loading}
                >
                  🗑️ Elimina
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {reservationToDelete && (
        <div className="confirm-overlay">
          <div className="confirm-toast">
            <p className="confirm-toast__label">CONFERMA ELIMINAZIONE</p>

            <h4 className="confirm-toast__title">Eliminare prenotazione?</h4>

            <p className="confirm-toast__text">
              Stai per eliminare la prenotazione{" "}
              <strong>#{reservationToDelete.id}</strong>. Questa azione è
              irreversibile.
            </p>

            <div className="confirm-toast__actions">
              <button
                className="profile-btn profile-btn--ghost"
                onClick={() => setReservationToDelete(null)}
                disabled={loading}
              >
                Annulla
              </button>

              <button
                className="profile-btn profile-btn--danger"
                onClick={handleConfirmDelete}
                disabled={loading}
              >
                {loading ? "Eliminazione..." : "Elimina"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminReservations

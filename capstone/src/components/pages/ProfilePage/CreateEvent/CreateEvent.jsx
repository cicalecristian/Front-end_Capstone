import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Form, Spinner } from "react-bootstrap"
import { FaCircleExclamation } from "react-icons/fa6"
import {
  getEventsAction,
  createEventAction,
  updateEventAction,
  deleteEventAction,
  clearEventErrorAction,
} from "../../../../redux/actions/eventAction"
import "./CreateEvent.css"

const initialFormData = {
  title: "",
  city: "",
  country: "",
  date: "",
  seat: "",
  artistId: "",
  cover: "",
}

const getTomorrowDate = () => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  return tomorrow.toISOString().split("T")[0]
}

const getEventFormData = (event) => ({
  title: event.title ?? "",
  city: event.city ?? "",
  country: event.country ?? "",
  date: event.date ?? "",
  seat: event.seat ?? "",
  artistId: event.artistId ?? event.artist?.id ?? "",
  cover: event.cover ?? "",
})

const CreateEvent = () => {
  const dispatch = useDispatch()

  const { events, loading, error } = useSelector((state) => state.events)

  const [formData, setFormData] = useState(initialFormData)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [eventToDelete, setEventToDelete] = useState(null)
  const [confirmAction, setConfirmAction] = useState(null)
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    dispatch(getEventsAction(50))

    return () => {
      dispatch(clearEventErrorAction())
    }
  }, [dispatch])

  const handleChange = (e) => {
    const { name, value } = e.target

    setSuccessMessage("")
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSeatStep = (amount) => {
    setSuccessMessage("")

    setFormData((prev) => {
      const currentValue = Number(prev.seat) || 0
      const nextValue = Math.min(Math.max(currentValue + amount, 100), 200000)

      return {
        ...prev,
        seat: nextValue,
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setConfirmAction(selectedEvent ? "update" : "create")
  }

  const handleEdit = (event) => {
    setSelectedEvent(event)
    setSuccessMessage("")
    setFormData(getEventFormData(event))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleReset = () => {
    setFormData(initialFormData)
    setSelectedEvent(null)
    setSuccessMessage("")
  }

  const handleAskDelete = (event) => {
    setEventToDelete(event)
    setConfirmAction("delete")
  }

  const handleConfirmSave = async () => {
    const eventData = {
      ...formData,
      seat: Number(formData.seat),
      cover: formData.cover.trim() || null,
    }

    const isUpdate = Boolean(selectedEvent)

    const ok = isUpdate
      ? await dispatch(updateEventAction(selectedEvent.id, eventData))
      : await dispatch(createEventAction(eventData))

    if (ok) {
      setFormData(initialFormData)
      setSelectedEvent(null)
      setConfirmAction(null)
      setSuccessMessage(
        isUpdate
          ? "Event successfully updated."
          : "Event created successfully.",
      )
    }
  }

  const handleConfirmDelete = async () => {
    if (!eventToDelete) return

    const ok = await dispatch(deleteEventAction(eventToDelete.id))

    if (ok) {
      if (selectedEvent?.id === eventToDelete.id) {
        setSelectedEvent(null)
        setFormData(initialFormData)
      }

      setEventToDelete(null)
      setConfirmAction(null)
      setSuccessMessage("Event successfully deleted.")
    }
  }

  const closeConfirmToast = () => {
    setConfirmAction(null)
    setEventToDelete(null)
  }

  const eventList = Array.isArray(events) ? events : []

  if (loading && eventList.length === 0) {
    return (
      <div className="loading-container">
        <Spinner animation="border" className="custom-spinner" />
        <p className="loading-text">Just Loading...</p>
      </div>
    )
  }

  if (error && eventList.length === 0) {
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
    <div className="create-event">
      <h1 className="create-event__heading">
        {selectedEvent ? "Edit" : "Create"} <span>event</span>
      </h1>

      <p className="create-event__meta">ADMIN · EVENTS</p>

      {error && (
        <div className="create-event__error">
          <FaCircleExclamation />
          {error}
        </div>
      )}

      <Form onSubmit={handleSubmit}>
        <p className="create-event__section-label">Event information</p>

        <div className="create-event__grid">
          <div className="create-event__field">
            <label className="create-event__label">Title</label>
            <input
              className="create-event__input"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              minLength={3}
              maxLength={50}
              required
            />
          </div>

          <div className="create-event__field">
            <label className="create-event__label">City</label>
            <input
              className="create-event__input"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              minLength={2}
              maxLength={50}
              required
            />
          </div>

          <div className="create-event__field">
            <label className="create-event__label">Country</label>
            <input
              className="create-event__input"
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              minLength={2}
              maxLength={50}
              required
            />
          </div>

          <div className="create-event__field">
            <label className="create-event__label">Date</label>
            <input
              className="create-event__input"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={getTomorrowDate()}
              required
            />
          </div>

          <div className="create-event__field">
            <label className="create-event__label">Seats available</label>

            <div className="create-event__number-control">
              <input
                className="create-event__input create-event__input--number"
                type="number"
                name="seat"
                value={formData.seat}
                onChange={handleChange}
                min={100}
                max={200000}
                required
              />

              <div className="create-event__number-buttons">
                <button
                  type="button"
                  className="create-event__number-btn"
                  onClick={() => handleSeatStep(100)}
                >
                  +
                </button>

                <button
                  type="button"
                  className="create-event__number-btn"
                  onClick={() => handleSeatStep(-100)}
                >
                  −
                </button>
              </div>
            </div>
          </div>

          <div className="create-event__field">
            <label className="create-event__label">Artist ID</label>
            <input
              className="create-event__input"
              type="text"
              name="artistId"
              value={formData.artistId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="create-event__field create-event__field--full">
            <label className="create-event__label">Cover</label>
            <input
              className="create-event__input"
              type="url"
              name="cover"
              value={formData.cover}
              onChange={handleChange}
              placeholder="URL cover image"
            />
          </div>
        </div>

        <div className="create-event__actions">
          <button
            type="submit"
            className="profile-btn profile-btn--edit"
            disabled={loading}
          >
            {selectedEvent ? " Save changes" : " Create event"}
          </button>

          <button
            type="button"
            className="profile-btn profile-btn--ghost event__btn"
            onClick={handleReset}
            disabled={loading}
          >
            Reset
          </button>
        </div>

        {successMessage && (
          <p className="create-event__success">{successMessage}</p>
        )}
      </Form>

      <p className="create-event__section-label create-event__list-title">
        Existing events
      </p>

      {eventList.length === 0 ? (
        <p className="create-event__empty">No events found.</p>
      ) : (
        <div className="create-event__list">
          {eventList.map((event) => (
            <div className="create-event__card" key={event.id}>
              <div className="create-event__card-left">
                <div className="create-event__icon">🎵</div>

                <div className="create-event__info">
                  <p className="create-event__name">{event.title}</p>
                  <p className="create-event__sub">
                    {event.city}, {event.country} · {event.date}
                  </p>
                  <span className="create-event__badge">
                    {event.seat} seats
                  </span>
                </div>
              </div>

              <div className="create-event__card-actions">
                <button
                  type="button"
                  className="profile-btn profile-btn--ghost  event__edit-btn"
                  onClick={() => handleEdit(event)}
                  disabled={loading}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="profile-btn profile-btn--danger"
                  onClick={() => handleAskDelete(event)}
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {confirmAction && (
        <div className="confirm-overlay">
          <div className="confirm-toast">
            <p className="confirm-toast__label">CONFIRM</p>

            <h4 className="confirm-toast__title">
              {confirmAction === "delete"
                ? "Delete event?"
                : selectedEvent
                  ? "Save changes?"
                  : "Create event?"}
            </h4>

            <p className="confirm-toast__text">
              {confirmAction === "delete" ? (
                <>
                  You are about to delete{" "}
                  <strong>{eventToDelete?.title}</strong>. This action is
                  irreversible.
                </>
              ) : (
                <>
                  You're going to {selectedEvent ? "edit" : "create"}{" "}
                  <strong>{formData.title}</strong> in{" "}
                  <strong>{formData.city}</strong>.
                </>
              )}
            </p>

            <div className="confirm-toast__actions">
              <button
                className="profile-btn profile-btn--ghost"
                onClick={closeConfirmToast}
                disabled={loading}
              >
                Cancel
              </button>

              <button
                className={
                  confirmAction === "delete"
                    ? "profile-btn profile-btn--danger"
                    : "profile-btn profile-btn--edit"
                }
                onClick={
                  confirmAction === "delete"
                    ? handleConfirmDelete
                    : handleConfirmSave
                }
                disabled={loading}
              >
                {loading ? "Please wait..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreateEvent

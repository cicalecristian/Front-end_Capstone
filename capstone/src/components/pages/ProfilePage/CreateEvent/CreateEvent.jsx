import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Form, Spinner } from "react-bootstrap"
import { FaCircleExclamation } from "react-icons/fa6"
import {
  createEventAction,
  clearEventErrorAction,
} from "../../../../redux/actions/eventAction"
import "./CreateEvent.css"

const getTomorrowDate = () => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  const year = tomorrow.getFullYear()
  const month = String(tomorrow.getMonth() + 1).padStart(2, "0")
  const day = String(tomorrow.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

const initialFormData = {
  title: "",
  city: "",
  country: "",
  date: "",
  seat: "",
  artistId: "",
  cover: "",
}

const CreateEvent = () => {
  const dispatch = useDispatch()

  const { loading, error } = useSelector((state) => state.events)

  const [formData, setFormData] = useState(initialFormData)
  const [showConfirmToast, setShowConfirmToast] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
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

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowConfirmToast(true)
  }

  const handleConfirmCreate = async () => {
    const eventData = {
      ...formData,
      seat: Number(formData.seat),
      cover: formData.cover.trim() || null,
    }

    const ok = await dispatch(createEventAction(eventData))

    if (ok) {
      setFormData(initialFormData)
      setSuccessMessage("Evento creato con successo.")
      setShowConfirmToast(false)
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" className="custom-spinner" />
        <p className="loading-text">Creazione evento...</p>
      </div>
    )
  }

  return (
    <div className="create-event">
      <h1 className="create-event__heading">
        Crea <span>evento</span>
      </h1>

      <p className="create-event__meta">ADMIN · NUOVO EVENTO</p>

      {error && (
        <div className="create-event__error">
          <FaCircleExclamation />
          {error}
        </div>
      )}

      <Form onSubmit={handleSubmit}>
        <p className="create-event__section-label">Informazioni evento</p>

        <div className="create-event__grid">
          <div className="create-event__field">
            <label className="create-event__label">Titolo</label>
            <input
              className="create-event__input"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Titolo evento"
              minLength={3}
              maxLength={50}
              required
            />
          </div>

          <div className="create-event__field">
            <label className="create-event__label">Città</label>
            <input
              className="create-event__input"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Città"
              minLength={2}
              maxLength={50}
              required
            />
          </div>

          <div className="create-event__field">
            <label className="create-event__label">Paese</label>
            <input
              className="create-event__input"
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Paese"
              minLength={2}
              maxLength={50}
              required
            />
          </div>

          <div className="create-event__field">
            <label className="create-event__label">Data</label>
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
            <label className="create-event__label">Posti disponibili</label>

            <div className="create-event__number-control">
              <input
                className="create-event__input create-event__input--number"
                type="number"
                name="seat"
                value={formData.seat}
                onChange={handleChange}
                placeholder="Minimo 100"
                min={100}
                max={200000}
                required
              />

              <div className="create-event__number-buttons">
                <button
                  type="button"
                  className="create-event__number-btn"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      seat: Math.min(Number(prev.seat || 100) + 100, 200000),
                    }))
                  }
                >
                  +
                </button>

                <button
                  type="button"
                  className="create-event__number-btn"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      seat: Math.max(Number(prev.seat || 100) - 100, 100),
                    }))
                  }
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
              placeholder="UUID artista"
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
              placeholder="URL immagine cover"
            />
          </div>
        </div>

        <div className="create-event__actions">
          <button
            type="submit"
            className="profile-btn profile-btn--edit"
            disabled={loading}
          >
            💾 Crea evento
          </button>

          <button
            type="button"
            className="profile-btn profile-btn--ghost"
            onClick={() => setFormData(initialFormData)}
          >
            ✕ Reset
          </button>
        </div>

        {successMessage && (
          <p className="create-event__success">{successMessage}</p>
        )}
      </Form>

      {showConfirmToast && (
        <div className="confirm-overlay">
          <div className="confirm-toast">
            <p className="confirm-toast__label">CONFERMA CREAZIONE</p>

            <h4 className="confirm-toast__title">Creare questo evento?</h4>

            <p className="confirm-toast__text">
              Stai per creare <strong>{formData.title}</strong> a{" "}
              <strong>{formData.city}</strong>. Controlla i dati prima di
              confermare.
            </p>

            <div className="confirm-toast__actions">
              <button
                className="profile-btn profile-btn--ghost"
                onClick={() => setShowConfirmToast(false)}
                disabled={loading}
              >
                Annulla
              </button>

              <button
                className="profile-btn profile-btn--edit"
                onClick={handleConfirmCreate}
                disabled={loading}
              >
                Conferma
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreateEvent

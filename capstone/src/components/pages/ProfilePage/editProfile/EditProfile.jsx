import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  updateProfileAction,
  updateAvatarAction,
  clearProfileErrorAction,
} from "../../../../redux/actions/profileAction"
import { Form } from "react-bootstrap"
import "./EditProfile.css"

const EditProfile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { profile, loading, error } = useSelector((state) => state.profile)
  const [avatarPreview, setAvatarPreview] = useState(profile?.avatar ?? null)

  const [formData, setFormData] = useState({
    name: profile?.name ?? "",
    surname: profile?.surname ?? "",
    username: profile?.username ?? "",
    email: profile?.email ?? "",
    password: "",
    dateOfBirth: profile?.dateOfBirth ?? "",
  })

  useEffect(() => {
    return () => dispatch(clearProfileErrorAction())
  }, [dispatch])

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ok = await dispatch(updateProfileAction(formData))
    if (ok) navigate("/profile")
  }

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setAvatarPreview(URL.createObjectURL(file))
    await dispatch(updateAvatarAction(file))
  }

  return (
    <div className="edit-profile-page">
      <h1 className="edit-profile-page__heading">
        Modifica <span>profilo</span>
      </h1>
      <p className="edit-profile-page__meta">ACCOUNT · IMPOSTAZIONI</p>

      {error && <p className="edit-profile-page__error">{error}</p>}

      <p className="profile-section-label">Foto profilo</p>
      <div className="edit-avatar">
        {avatarPreview ? (
          <img src={avatarPreview} alt="avatar" className="edit-avatar__img" />
        ) : (
          <div className="edit-avatar__placeholder">
            {`${profile?.name?.[0] ?? ""}${profile?.surname?.[0] ?? ""}`.toUpperCase()}
          </div>
        )}
        <div className="edit-avatar__actions">
          <label className="profile-btn profile-btn--ghost edit-avatar__label">
            📷 Cambia foto
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: "none" }}
            />
          </label>
          <p className="edit-avatar__hint">JPG, PNG o WebP — max 5MB</p>
        </div>
      </div>

      <Form onSubmit={handleSubmit}>
        <p className="profile-section-label">Informazioni personali</p>
        <div className="edit-grid">
          <div className="edit-field">
            <label className="edit-field__label">Nome</label>
            <input
              className="edit-field__input"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Il tuo nome"
            />
          </div>

          <div className="edit-field">
            <label className="edit-field__label">Cognome</label>
            <input
              className="edit-field__input"
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              placeholder="Il tuo cognome"
            />
          </div>

          <div className="edit-field">
            <label className="edit-field__label">Username</label>
            <input
              className="edit-field__input"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Il tuo username"
            />
          </div>

          <div className="edit-field">
            <label className="edit-field__label">Email</label>
            <input
              className="edit-field__input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="La tua email"
            />
          </div>

          <div className="edit-field">
            <label className="edit-field__label">Nuova password</label>
            <input
              className="edit-field__input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Lascia vuoto per non cambiarla"
            />
          </div>

          <div className="edit-field">
            <label className="edit-field__label">Data di nascita</label>
            <input
              className="edit-field__input"
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="profile-actions" style={{ marginTop: "1.5rem" }}>
          <button
            type="submit"
            className="profile-btn profile-btn--edit"
            disabled={loading}
          >
            {loading ? "Salvataggio..." : "💾 Salva modifiche"}
          </button>
          <button
            type="button"
            className="profile-btn profile-btn--ghost"
            onClick={() => navigate("/profile")}
          >
            ✕ Annulla
          </button>
        </div>
      </Form>
    </div>
  )
}

export default EditProfile

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  getProfileAction,
  updateProfileAction,
  updateAvatarAction,
  clearProfileErrorAction,
} from "../../../../redux/actions/profileAction"
import { Form, Spinner } from "react-bootstrap"
import { FaCircleExclamation } from "react-icons/fa6"
import "./EditProfile.css"

const createFormData = (profile) => ({
  name: profile.name ?? "",
  surname: profile.surname ?? "",
  username: profile.username ?? "",
  email: profile.email ?? "",
  password: "",
  dateOfBirth: profile.dateOfBirth ?? "",
})

const EditProfileForm = ({ profile, loading }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [avatarPreview, setAvatarPreview] = useState(profile.avatar ?? null)
  const [formData, setFormData] = useState(() => createFormData(profile))

  const initials =
    `${profile.name?.[0] ?? ""}${profile.surname?.[0] ?? ""}`.toUpperCase()

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const profileData = { ...formData }

    if (!profileData.password) {
      delete profileData.password
    }

    const ok = await dispatch(updateProfileAction(profileData))

    if (ok) {
      navigate("/profile")
    }
  }

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0]

    if (!file) return

    setAvatarPreview(URL.createObjectURL(file))
    await dispatch(updateAvatarAction(file))
  }

  return (
    <div className="edit-profile-page">
      <h1 className="edit-profile-page__heading">
        Edit <span>profile</span>
      </h1>

      <p className="edit-profile-page__meta">ACCOUNT · SETTINGS</p>

      <p className="profile-section-label">Profile photo</p>

      <div className="edit-avatar">
        {avatarPreview ? (
          <img src={avatarPreview} alt="avatar" className="edit-avatar__img" />
        ) : (
          <div className="edit-avatar__placeholder">{initials}</div>
        )}

        <div className="edit-avatar__actions">
          <label className="profile-btn profile-btn--ghost edit-avatar__label">
            📷 Change photo
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: "none" }}
            />
          </label>

          <p className="edit-avatar__hint">JPG, PNG or WebP — max 5MB</p>
        </div>
      </div>

      <Form onSubmit={handleSubmit}>
        <p className="profile-section-label">Personal information</p>

        <div className="edit-grid">
          <div className="edit-field">
            <label className="edit-field__label">Name</label>
            <input
              className="edit-field__input"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
            />
          </div>

          <div className="edit-field">
            <label className="edit-field__label">Surname</label>
            <input
              className="edit-field__input"
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              placeholder="Your surname"
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
              placeholder="Your username"
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
              placeholder="Your email"
            />
          </div>

          <div className="edit-field">
            <label className="edit-field__label">New Password</label>
            <input
              className="edit-field__input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Leave it blank so it doesn't change"
            />
          </div>

          <div className="edit-field">
            <label className="edit-field__label">Date of birth</label>
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
            {loading ? "Saving..." : "Save changes"}
          </button>

          <button
            type="button"
            className="profile-btn profile-btn--ghost cancel-button"
            onClick={() => navigate("/profile")}
          >
            Cancel
          </button>
        </div>
      </Form>
    </div>
  )
}

const EditProfile = () => {
  const dispatch = useDispatch()
  const { profile, loading, error } = useSelector((state) => state.profile)

  useEffect(() => {
    if (!profile) {
      dispatch(getProfileAction())
    }
  }, [dispatch, profile])

  useEffect(() => {
    return () => {
      dispatch(clearProfileErrorAction())
    }
  }, [dispatch])

  if (loading && !profile) {
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

  if (!profile) {
    return (
      <div className="loading-container">
        <Spinner animation="border" className="custom-spinner" />
        <p className="loading-text">Loading profile...</p>
      </div>
    )
  }

  return (
    <EditProfileForm
      key={profile.id ?? profile.email ?? profile.username}
      profile={profile}
      loading={loading}
    />
  )
}

export default EditProfile

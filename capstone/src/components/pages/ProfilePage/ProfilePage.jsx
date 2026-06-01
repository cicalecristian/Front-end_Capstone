import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  getProfileAction,
  deleteProfileAction,
} from "../../../redux/actions/profileAction"
import { logoutAction } from "../../../redux/actions/authAction"
import { Spinner } from "react-bootstrap"
import { FaCircleExclamation } from "react-icons/fa6"
import "./ProfilePage.css"

const ProfilePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { profile, loading, error } = useSelector((state) => state.profile)
  const [showDeleteToast, setShowDeleteToast] = useState(false)

  const isAdmin = profile?.role === "ROLE_ADMIN"

  useEffect(() => {
    dispatch(getProfileAction())
  }, [dispatch])

  const handleConfirmDelete = async () => {
    const ok = await dispatch(deleteProfileAction())
    if (ok) {
      dispatch(logoutAction())
      navigate("/")
    }
  }

  const handleLogout = () => {
    dispatch(logoutAction())
    navigate("/")
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

  if (!profile) {
    return (
      <div className="loading-container">
        <Spinner animation="border" className="custom-spinner" />
        <p className="loading-text">Caricamento profilo...</p>
      </div>
    )
  }

  const initials =
    `${profile.name?.[0] ?? ""}${profile.surname?.[0] ?? ""}`.toUpperCase()

  return (
    <div className="profile-page">
      <h1 className="profile-page__heading">
        Il mio <span>profilo</span>
      </h1>
      <p className="profile-page__meta">ACCOUNT · IMPOSTAZIONI</p>

      <div className="profile-hero">
        {profile.avatar ? (
          <img
            src={profile.avatar}
            alt="avatar"
            className="profile-hero__avatar"
          />
        ) : (
          <div className="profile-hero__initials">{initials}</div>
        )}
        <div>
          <h2 className="profile-hero__name">
            {profile.name} {profile.surname}
          </h2>
          <p className="profile-hero__email">{profile.email}</p>
          <span
            className={`profile-badge ${isAdmin ? "profile-badge--admin" : "profile-badge--user"}`}
          >
            {isAdmin ? "Admin" : "Utente"}
          </span>
        </div>
      </div>

      <p className="profile-section-label">Informazioni personali</p>
      <div className="profile-grid">
        <div className="profile-row">
          <div className="profile-row__icon">👤</div>
          <div>
            <span className="profile-row__label">Nome completo</span>
            <span className="profile-row__value">
              {profile.name} {profile.surname}
            </span>
          </div>
        </div>
        <div className="profile-row">
          <div className="profile-row__icon">✉️</div>
          <div>
            <span className="profile-row__label">Email</span>
            <span className="profile-row__value">{profile.email}</span>
          </div>
        </div>
        <div className="profile-row">
          <div className="profile-row__icon">📅</div>
          <div>
            <span className="profile-row__label">Data di nascita</span>
            <span className="profile-row__value">{profile.dateOfBirth}</span>
          </div>
        </div>
        <div className="profile-row">
          <div className="profile-row__icon">🏷️</div>
          <div>
            <span className="profile-row__label">Username</span>
            <span className="profile-row__value">@{profile.username}</span>
          </div>
        </div>
      </div>

      {isAdmin && (
        <>
          <p className="profile-section-label">Area admin</p>
          <div className="profile-admin">
            <p className="profile-admin__title">⭐ Strumenti amministratore</p>
            <div className="profile-grid">
              <div
                className="profile-row"
                onClick={() => navigate("/admin/users")}
              >
                <div className="profile-row__icon">👥</div>
                <div>
                  <span className="profile-row__label">Gestisci utenti</span>
                  <span className="profile-row__value">
                    Visualizza, modifica o elimina account
                  </span>
                </div>
              </div>
              <div
                className="profile-row"
                onClick={() => navigate("/admin/reservations")}
              >
                <div className="profile-row__icon">📋</div>
                <div>
                  <span className="profile-row__label">
                    Prenotazioni globali
                  </span>
                  <span className="profile-row__value">
                    Visualizza tutte le prenotazioni
                  </span>
                </div>
              </div>
              <div
                className="profile-row"
                onClick={() => navigate("/admin/content")}
              >
                <div className="profile-row__icon">🎵</div>
                <div>
                  <span className="profile-row__label">Gestisci contenuti</span>
                  <span className="profile-row__value">
                    Artisti, eventi, canzoni
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <p className="profile-section-label">Azioni</p>
      <div className="profile-actions">
        <button
          className="profile-btn profile-btn--edit"
          onClick={() => navigate("/profile/edit")}
        >
          ✏️ Modifica profilo
        </button>
        <button
          className="profile-btn profile-btn--ghost"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>
        <button
          className="profile-btn profile-btn--danger"
          onClick={() => setShowDeleteToast(true)}
        >
          🗑️ Elimina account
        </button>
      </div>

      {showDeleteToast && (
        <div className="confirm-overlay">
          <div className="confirm-toast">
            <p className="confirm-toast__label">CONFERMA ELIMINAZIONE</p>
            <h4 className="confirm-toast__title">Sei sicuro?</h4>
            <p className="confirm-toast__text">
              Stai per eliminare il tuo account. Questa azione è irreversibile.
            </p>
            <div className="confirm-toast__actions">
              <button
                className="profile-btn profile-btn--ghost"
                onClick={() => setShowDeleteToast(false)}
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

export default ProfilePage

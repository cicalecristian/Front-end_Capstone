import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  getProfileAction,
  deleteProfileAction,
} from "../../../redux/actions/profileAction"
import { logoutAction } from "../../../redux/actions/authAction"
import "./ProfilePage.css"

const ProfilePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { profile, loading } = useSelector((state) => state.profile)
  console.log(profile)

  const isAdmin = profile?.role === "ROLE_ADMIN"

  useEffect(() => {
    dispatch(getProfileAction())
  }, [dispatch])

  const handleDelete = async () => {
    if (!window.confirm("Sei sicuro di voler eliminare il tuo account?")) return
    const ok = await dispatch(deleteProfileAction())
    if (ok) {
      dispatch(logoutAction())
      navigate("/login")
    }
  }

  const handleLogout = () => {
    dispatch(logoutAction())
    navigate("/login")
  }

  if (loading || !profile)
    return <p className="profile-page__empty">Caricamento...</p>

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
          onClick={handleDelete}
        >
          🗑️ Elimina account
        </button>
      </div>
    </div>
  )
}

export default ProfilePage

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getUsersAction,
  deleteUserAction,
  changeRoleAction,
} from "../../../../redux/actions/userAction"
import { Spinner } from "react-bootstrap"
import { FaCircleExclamation } from "react-icons/fa6"
import "./AdminUsers.css"

const AdminUsers = () => {
  const dispatch = useDispatch()
  const { users, loading, error } = useSelector((state) => state.users)
  const [confirmToast, setConfirmToast] = useState(null)

  useEffect(() => {
    dispatch(getUsersAction())
  }, [dispatch])

  const handleDeleteClick = (user) => {
    setConfirmToast({
      userId: user.id,
      userName: `${user.name} ${user.surname}`,
    })
  }

  const handleConfirmDelete = async () => {
    if (!confirmToast) return
    await dispatch(deleteUserAction(confirmToast.userId))
    setConfirmToast(null)
  }

  const handleChangeRole = (userId, currentRole) => {
    const newRole = currentRole === "ROLE_ADMIN" ? "ROLE_USER" : "ROLE_ADMIN"
    dispatch(changeRoleAction(userId, newRole))
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

  return (
    <div className="admin-users">
      <h1 className="admin-users__heading">
        Gestione <span>utenti</span>
      </h1>
      <p className="admin-users__meta">ADMIN · UTENTI</p>

      {users.length === 0 ? (
        <p className="admin-users__empty">Nessun utente trovato.</p>
      ) : (
        <div className="admin-users__grid">
          {users.map((user) => (
            <div key={user.id} className="admin-users__card">
              <div className="admin-users__card-left">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="admin-users__avatar"
                  />
                ) : (
                  <div className="admin-users__initials">
                    {`${user.name?.[0] ?? ""}${user.surname?.[0] ?? ""}`.toUpperCase()}
                  </div>
                )}
                <div className="admin-users__info">
                  <p className="admin-users__name">
                    {user.name} {user.surname}
                  </p>
                  <p className="admin-users__sub">{user.email}</p>
                  <span
                    className={`admin-users__badge ${user.role === "ROLE_ADMIN" ? "admin-users__badge--admin" : "admin-users__badge--user"}`}
                  >
                    {user.role === "ROLE_ADMIN" ? "Admin" : "Utente"}
                  </span>
                </div>
              </div>
              <div className="admin-users__actions">
                <button
                  className="profile-btn profile-btn--ghost"
                  onClick={() => handleChangeRole(user.id, user.role)}
                >
                  {user.role === "ROLE_ADMIN"
                    ? "⬇️ Rendi utente"
                    : "⬆️ Rendi admin"}
                </button>
                <button
                  className="profile-btn profile-btn--danger"
                  onClick={() => handleDeleteClick(user)}
                >
                  🗑️ Elimina
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {confirmToast && (
        <div className="confirm-overlay">
          <div className="confirm-toast">
            <p className="confirm-toast__label">CONFERMA ELIMINAZIONE</p>
            <h4 className="confirm-toast__title">Sei sicuro?</h4>
            <p className="confirm-toast__text">
              Stai per eliminare l'account di{" "}
              <strong>{confirmToast.userName}</strong>. Questa azione è
              irreversibile.
            </p>
            <div className="confirm-toast__actions">
              <button
                className="profile-btn profile-btn--ghost"
                onClick={() => setConfirmToast(null)}
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

export default AdminUsers

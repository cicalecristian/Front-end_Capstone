import { Link, useNavigate } from "react-router-dom"
import { FaCircleExclamation, FaHouse, FaArrowLeft } from "react-icons/fa6"
import "./ErrorPage.css"

const ErrorPage = ({
  code = "404",
  title = "Page not found",
  message = "The page you are looking for does not exist or has been moved.",
}) => {
  const navigate = useNavigate()

  return (
    <main className="error-page">
      <section className="error-card">
        <div className="error-card__icon">
          <FaCircleExclamation />
        </div>

        <p className="error-card__label">ERROR {code}</p>

        <h1 className="error-card__title">
          {title.split(" ")[0]}{" "}
          <span>{title.split(" ").slice(1).join(" ")}</span>
        </h1>

        <p className="error-card__text">{message}</p>

        <div className="error-card__actions">
          <button
            type="button"
            className="error-btn error-btn--ghost"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
            Go back
          </button>

          <Link to="/home" className="error-btn error-btn--primary">
            <FaHouse />
            Home
          </Link>
        </div>
      </section>
    </main>
  )
}

export default ErrorPage

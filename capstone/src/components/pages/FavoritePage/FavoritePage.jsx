import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getFavoritesAction,
  removeFavoriteAction,
} from "../../../redux/actions/favoriteAction"
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap"
import { Link } from "react-router-dom"
import { FaHeart, FaCircleExclamation } from "react-icons/fa6"
import "./FavoritePage.css"

const FavoritesPage = () => {
  const dispatch = useDispatch()

  const favorites = useSelector((state) => state.favorites.favorites)
  const loading = useSelector((state) => state.favorites.loading)
  const error = useSelector((state) => state.favorites.error)

  useEffect(() => {
    dispatch(getFavoritesAction())
  }, [dispatch])

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
    <Container fluid className="favorites-page py-5 px-4">
      <div className="mb-5 text-center">
        <h1 className="favorites-title">Your Favorite Songs</h1>

        <p className="favorites-subtitle">
          All the music you love, in one place.
        </p>
      </div>

      {!favorites.length ? (
        <div className="empty-favorites">
          <FaHeart className="empty-heart" />

          <h3>No favorite songs yet</h3>

          <p>Start adding songs you love.</p>
        </div>
      ) : (
        <Row className="g-4">
          {favorites.map((favorite) => (
            <Col xs={6} md={4} lg={3} xl={2} key={favorite.id}>
              <Card className="favorite-card h-100">
                <Link
                  to={`/songs/${favorite.songId}`}
                  className="text-decoration-none"
                >
                  <img
                    src={favorite.cover}
                    alt={favorite.title}
                    className="favorite-cover"
                  />
                </Link>

                <Card.Body className="d-flex flex-column">
                  <h5 className="favorite-song-title text-truncate">
                    {favorite.title}
                  </h5>

                  <p className="favorite-artists">
                    {favorite.artists
                      .map((artist) => artist.artistName)
                      .join(", ")}
                  </p>

                  <p className="favorite-genre">{favorite.genre}</p>

                  <Button
                    className="remove-favorite-btn mt-auto"
                    onClick={() => dispatch(removeFavoriteAction(favorite.id))}
                  >
                    <FaHeart />
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}

export default FavoritesPage

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, Link } from "react-router-dom"
import { Container, Row, Col, Spinner, Button } from "react-bootstrap"
import { FaCircleExclamation, FaHeart, FaRegHeart } from "react-icons/fa6"
import { getSingleSongAction } from "../redux/actions/songAction"
import {
  addFavoriteAction,
  removeFavoriteAction,
} from "../redux/actions/favoriteAction"

const SongDetails = () => {
  const dispatch = useDispatch()

  const { id } = useParams()
  const song = useSelector((state) => state.songs.singleSong)
  const error = useSelector((state) => state.songs.error)
  const loading = useSelector((state) => state.songs.loading)
  const favorites = useSelector((state) => state.favorites.favorites)

  useEffect(() => {
    dispatch(getSingleSongAction(id))
  }, [dispatch, id])

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

  if (!song) return null

  const favoriteFound = favorites.find(
    (favorite) => favorite.songId === song.id,
  )

  const isFavorite = !!favoriteFound

  return (
    <Container fluid className="song-details-page">
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col xs={11} md={9} lg={7} xl={5} className="text-center">
          <div className="song-details-card">
            <img
              src={song.cover}
              alt={song.title}
              className="song-details-cover"
            />

            <h1 className="song-details-title">{song.title}</h1>

            <Link
              to={`/artists/${song.artists[0].artistId}`}
              className="text-decoration-none"
            >
              <h4 className="song-details-artist">
                {song.artists[0].artistName}
              </h4>
            </Link>

            <div className="song-details-info">
              <ul className="list-unstyled d-flex justify-content-center gap-2 small flex-wrap">
                <li>{song.genre}</li>

                {" • "}

                <li>
                  {Math.floor(song.duration / 60)}m {song.duration % 60}s
                </li>

                {" • "}

                <li>{song.releaseDate}</li>
              </ul>
            </div>

            <Button
              className="favorite-btn"
              onClick={() => {
                if (isFavorite) {
                  dispatch(removeFavoriteAction(favoriteFound.id))
                } else {
                  dispatch(addFavoriteAction(song.id))
                }
              }}
            >
              {isFavorite ? <FaHeart /> : <FaRegHeart />}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default SongDetails

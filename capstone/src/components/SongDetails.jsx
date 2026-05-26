import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getSingleSongAction } from "../redux/actions/songAction"
import { Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Spinner } from "react-bootstrap"
import { FaCircleExclamation } from "react-icons/fa6"

const SongDetails = () => {
  const dispatch = useDispatch()

  const { id } = useParams()
  const song = useSelector((state) => state.songs.singleSong)
  const error = useSelector((state) => state.songs.error)
  const loading = useSelector((state) => state.songs.loading)

  console.log(song)

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

  if (!song) {
    return null
  }

  return (
    <Container fluid className=" background-app min-vh-100">
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col xs={11} md={9} lg={7} xl={5} className="text-center">
          <img
            src={song.cover}
            alt={song.title}
            className="song-details-cover"
          />
          <h1 className="song-details-title">{song.title}</h1>
          <Link
            to={`/artists/${song.artists[0].artistId}`}
            className="text-decoration-none song-details-artist"
          >
            <h4 className="song-details-artist d-inline-block">
              {song.artists[0].artistName}
            </h4>
          </Link>
          <div className="song-details-info">
            <ul className=" list-unstyled d-flex justify-content-center gap-2 small">
              <li>{song.genre}</li>
              {" • "}
              <li>
                {Math.floor(song.duration / 60)}m {song.duration % 60}s
              </li>
              {" • "}
              <li>{song.releaseDate}</li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default SongDetails

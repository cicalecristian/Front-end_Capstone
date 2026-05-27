import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getSingleArtistAction } from "../../../redux/actions/artistAction"
import { Container, Row, Col } from "react-bootstrap"
import { Spinner } from "react-bootstrap"
import { FaCircleExclamation } from "react-icons/fa6"
import "./ArtistDetails.css"

const ArtistDetails = () => {
  const dispatch = useDispatch()

  const { id } = useParams()
  const artist = useSelector((state) => state.artists.singleArtist)
  const error = useSelector((state) => state.artists.error)
  const loading = useSelector((state) => state.artists.loading)

  console.log(artist)
  console.log("ID from params:", id)

  useEffect(() => {
    dispatch(getSingleArtistAction(id))
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

  if (!artist) {
    return null
  }

  return (
    <Container fluid className="artist-details-page p-0">
      <div
        className="artist-background"
        style={{
          backgroundImage: `url(${artist.avatar})`,
        }}
      >
        <div className="artist-overlay">
          <Row className="justify-content-center align-items-center min-vh-100 m-0">
            <Col xs={11} md={9} lg={7} xl={5} className="text-center">
              <img
                src={artist.avatar}
                alt={artist.artistName}
                className="artist-details-avatar"
              />

              <div className="artist-info-box">
                <h1 className="artist-details-name">{artist.artistName}</h1>

                <h4 className="artist-details-nationality">
                  {artist.nationality}
                </h4>

                <p className="artist-details-info">
                  {artist.genre}
                  {" • "}
                  Born in {artist.dateOfBirth}
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  )
}

export default ArtistDetails

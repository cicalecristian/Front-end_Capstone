import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import TrendingSongs from "../trending/TrendingSongs"
import TrendingArtists from "../trending/TrendingArtists"
import TrendingEvents from "../trending/TrendingEvents"
import { getSongsAction } from "../../redux/actions/songAction"
import { getArtistsAction } from "../../redux/actions/artistAction"
import { getEventsAction } from "../../redux/actions/eventAction"
import { Spinner, Container } from "react-bootstrap"
import { FaCircleExclamation } from "react-icons/fa6"
import Navbar from "../layout/navbar/Navbar"

const Home = () => {
  const dispatch = useDispatch()

  const songsLoading = useSelector((state) => state.songs.loading)
  const artistsLoading = useSelector((state) => state.artists.loading)
  const eventsLoading = useSelector((state) => state.events.loading)
  const songsError = useSelector((state) => state.songs.error)
  const artistsError = useSelector((state) => state.artists.error)
  const eventsError = useSelector((state) => state.events.error)
  const songs = useSelector((state) => state.songs.songs)
  const artists = useSelector((state) => state.artists.artists)
  const events = useSelector((state) => state.events.events)

  useEffect(() => {
    dispatch(getSongsAction())
    dispatch(getArtistsAction())
    dispatch(getEventsAction())
  }, [dispatch])

  const loading = songsLoading || artistsLoading || eventsLoading
  const error = songsError || artistsError || eventsError

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
    <Container fluid className=" g-0">
      <Navbar />
      <TrendingSongs songs={songs} />
      <TrendingArtists artists={artists} />
      <TrendingEvents events={events} />
    </Container>
  )
}

export default Home

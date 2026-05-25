import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSongsAction } from "../redux/actions/songAction"
import { Card, Spinner } from "react-bootstrap"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import { Link } from "react-router-dom"
import { FaCircleExclamation } from "react-icons/fa6"

const TrendingSongs = () => {
  const dispatch = useDispatch()

  const songs = useSelector((state) => state.songs.songs)
  const error = useSelector((state) => state.songs.error)
  const loading = useSelector((state) => state.songs.loading)

  console.log(songs)

  useEffect(() => {
    dispatch(getSongsAction())
  }, [])

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

  if (!songs) {
    return null
  }

  return (
    <>
      <div>
        <h3 className=" fst-italic m-0 px-3">TRENDING SONGS</h3>
      </div>
      <Swiper
        className=" px-3"
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },

          576: {
            slidesPerView: 3,
          },

          768: {
            slidesPerView: 4,
          },

          992: {
            slidesPerView: 5,
          },
          1200: {
            slidesPerView: 6,
          },
        }}
      >
        {songs.map((song) => (
          <SwiperSlide key={song.id}>
            <Link to={`/songs/${song.id}`} className="text-decoration-none">
              <Card className=" bg-transparent card-effect">
                <div>
                  <img
                    src={song.cover}
                    alt={song.title}
                    className=" w-100 rounded-top"
                  />
                </div>

                <Card.Body className=" p-2 bg-black rounded-bottom bg-gradient">
                  <Card.Title className=" text-white text-center mb-3 mt-2 song-title text-truncate">
                    {song.title}
                  </Card.Title>
                  <Card.Text className=" text-white text-center song-artistName fw-light">
                    {song.artists.map((artist) => artist.artistName)}
                  </Card.Text>

                  <Card.Text className=" text-white text-center song-genre mb-2 font-monospace">
                    {song.genre}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default TrendingSongs

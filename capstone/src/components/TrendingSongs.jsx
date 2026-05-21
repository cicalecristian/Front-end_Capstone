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

  useEffect(() => {
    dispatch(getSongsAction())
  }, [])

  if (loading) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="black" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div className="text-danger fw-semibold d-flex align-items-center gap-2 fs-5">
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
            slidesPerView: 3,
          },

          576: {
            slidesPerView: 4,
          },

          768: {
            slidesPerView: 5,
          },

          992: {
            slidesPerView: 7,
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

                <Card.Body className=" p-2 bg-dark rounded-bottom">
                  <Card.Title className=" text-white text-center mb-3 mt-2 song-title text-truncate">
                    {song.title}
                  </Card.Title>
                  <Card.Text className=" text-white text-center song-artistName">
                    {song.artists.map((artist) => artist.artistName)}
                  </Card.Text>

                  <Card.Text className=" text-white text-center song-genre mb-2">
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

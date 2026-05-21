import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSongsAction } from "../redux/actions/songAction"
import { Card, Spinner } from "react-bootstrap"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import { Link } from "react-router-dom"

const TrendingSongs = () => {
  const dispatch = useDispatch()

  const songs = useSelector((state) => state.songs.songs)
  const error = useSelector((state) => state.songs.error)
  const loading = useSelector((state) => state.songs.loading)

  useEffect(() => {
    dispatch(getSongsAction())
  }, [])

  console.log(songs)

  if (loading) {
    return <Spinner animation="border" />
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <Swiper
      className=" mt-5"
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
      }}
    >
      {songs.map((song) => (
        <SwiperSlide key={song.id}>
          <Link to={`/songs/${song.id}`} className="text-decoration-none">
            <Card className=" border-0 bg-transparent h-100">
              <div>
                <img
                  src={song.cover}
                  alt={song.title}
                  className=" w-100 rounded-top"
                />
              </div>

              <Card.Body className="px-0 pt-2 bg-dark rounded-bottom pt-3 pb-3">
                <Card.Title className=" text-white text-center my-3 song-title text-truncate">
                  {song.title}
                </Card.Title>
                <Card.Text className=" text-white text-center song-artistName">
                  {song.artists.map((artist) => artist.artistName)}
                </Card.Text>

                <Card.Text className=" text-white text-center song-genre mb-3">
                  {song.genre}
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default TrendingSongs

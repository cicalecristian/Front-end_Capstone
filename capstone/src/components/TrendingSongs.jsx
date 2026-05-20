import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSongsAction } from "../redux/actions/songAction"
import { Card, Spinner } from "react-bootstrap"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"

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
          <Card className=" border-0 bg-transparent">
            <div>
              <img
                src={song.cover}
                alt={song.title}
                className="song-image w-100 rounded-top"
              />
            </div>

            <Card.Body className="px-0 pt-2 bg-dark rounded-bottom">
              <Card.Title className="song-title text-white text-center">
                {song.title}
              </Card.Title>

              <Card.Text className="song-genre text-white text-center">
                {song.genre}
              </Card.Text>
            </Card.Body>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default TrendingSongs

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getArtistsAction } from "../redux/actions/artistAction"
import { Card, Spinner } from "react-bootstrap"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import { Link } from "react-router-dom"
import { FaCircleExclamation } from "react-icons/fa6"

const TrendingArtists = () => {
  const dispatch = useDispatch()

  const artists = useSelector((state) => state.artists.artists)
  const error = useSelector((state) => state.artists.error)
  const loading = useSelector((state) => state.artists.loading)

  console.log(artists)

  useEffect(() => {
    dispatch(getArtistsAction())
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

  if (!artists) {
    return null
  }
  return (
    <>
      <div>
        <h3 className=" fst-italic m-0 px-3">TRENDING ARTISTS</h3>
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
        {artists.map(
          (artist) => (
            console.log("Artist ID:", artist.id),
            (
              <SwiperSlide key={artist.id}>
                <Link
                  to={`/artists/${artist.id}`}
                  className="text-decoration-none"
                >
                  <Card className=" bg-transparent card-effect">
                    <div>
                      <img
                        src={artist.avatar}
                        alt={artist.title}
                        className=" w-100 rounded-top"
                      />
                    </div>

                    <Card.Body className=" p-2 bg-black rounded-bottom bg-gradient">
                      <Card.Title className=" text-white text-center mb-3 mt-2 artist-artistName text-truncate">
                        {artist.artistName}
                      </Card.Title>
                      <Card.Text className=" text-white text-center artist-nationality fw-light">
                        {artist.nationality}
                      </Card.Text>

                      <Card.Text className=" text-white text-center artist-genre mb-2 font-monospace">
                        {artist.genre}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </SwiperSlide>
            )
          ),
        )}
      </Swiper>
    </>
  )
}

export default TrendingArtists

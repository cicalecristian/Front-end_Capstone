import { Card } from "react-bootstrap"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import { Link } from "react-router-dom"

const TrendingArtists = ({ artists }) => {
  if (!artists?.length) return null

  return (
    <>
      <div>
        <h3 className="fst-italic m-0 px-3">TRENDING ARTISTS</h3>
      </div>

      <Swiper
        className="px-3"
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
        {artists.map((artist) => (
          <SwiperSlide key={artist.id}>
            <Link to={`/artists/${artist.id}`} className="text-decoration-none">
              <Card className="bg-transparent card-effect">
                <div>
                  <img
                    src={artist.avatar}
                    alt={artist.artistName}
                    className="w-100 rounded-top"
                  />
                </div>

                <Card.Body className="p-2 bg-black rounded-bottom bg-gradient">
                  <Card.Title className="text-white text-center mb-3 mt-2 artist-artistName text-truncate">
                    {artist.artistName}
                  </Card.Title>

                  <Card.Text className="text-white text-center artist-nationality fw-light">
                    {artist.nationality}
                  </Card.Text>

                  <Card.Text className="text-white text-center artist-genre mb-2 font-monospace">
                    {artist.genre}
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

export default TrendingArtists

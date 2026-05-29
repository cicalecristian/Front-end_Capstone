import { Card } from "react-bootstrap"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import { Link } from "react-router-dom"

const TrendingEvents = ({ events }) => {
  if (!events?.length) return null

  return (
    <>
      <div>
        <h3 className="fst-italic m-0 px-3">TRENDING EVENTS</h3>
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
        {events.map((event) => (
          <SwiperSlide key={event.id}>
            <Link to={`/events/${event.id}`} className="text-decoration-none">
              <Card className="card-effect bg-transparent border-0">
                <div>
                  <img src={event.cover} alt={event.title} className="w-100" />
                </div>

                <Card.Body className="p-2 bg-black bg-gradient">
                  <Card.Title className="text-white text-center mb-3 mt-2 event-title text-truncate">
                    {event.title}
                  </Card.Title>

                  <Card.Text className="text-white text-center event-city fw-lighter text-truncate">
                    city: {event.city}
                  </Card.Text>

                  <Card.Text className="text-white text-center event-date mb-2 font-monospace">
                    {event.date?.split("-").reverse().join("-")}
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

export default TrendingEvents

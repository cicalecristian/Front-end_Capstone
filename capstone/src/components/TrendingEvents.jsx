import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getEventsAction } from "../redux/actions/eventAction"
import { Card, Spinner } from "react-bootstrap"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import { Link } from "react-router-dom"
import { FaCircleExclamation } from "react-icons/fa6"

const TrendingEvents = () => {
  const dispatch = useDispatch()

  const events = useSelector((state) => state.events.events)
  const error = useSelector((state) => state.events.error)
  const loading = useSelector((state) => state.events.loading)

  console.log(events)

  useEffect(() => {
    dispatch(getEventsAction())
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

  if (!events) {
    return null
  }
  return (
    <>
      <div>
        <h3 className=" fst-italic m-0 px-3">TRENDING EVENTS</h3>
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
        {events.map((event) => (
          <SwiperSlide key={event.id}>
            <Link to={`/events/${event.id}`} className="text-decoration-none">
              <Card className=" bg-transparent card-effect">
                <div>
                  <img
                    src={event.cover}
                    alt={event.title}
                    className=" w-100 rounded-top"
                  />
                </div>

                <Card.Body className=" p-2 bg-black rounded-bottom bg-gradient">
                  <Card.Title className=" text-white text-center mb-3 mt-2 event-title text-truncate">
                    {event.title}
                  </Card.Title>
                  <Card.Text className=" text-white text-center event-city fw-lighter text-truncate">
                    city: {event.city}
                  </Card.Text>

                  <Card.Text className=" text-white text-center event-date mb-2 font-monospace">
                    {event.date}
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

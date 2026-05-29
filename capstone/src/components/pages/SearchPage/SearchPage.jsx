import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useSearchParams, useNavigate } from "react-router-dom"
import { getSongsAction } from "../../../redux/actions/songAction"
import { getArtistsAction } from "../../../redux/actions/artistAction"
import { getEventsAction } from "../../../redux/actions/eventAction"
import "./SearchPage.css"
import Navbar from "../../layout/navbar/Navbar"

const SearchPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const query = searchParams.get("q")?.toLowerCase() || ""
  const type = searchParams.get("type") || "song"

  const songs = useSelector((state) => state.songs.songs || [])
  const artists = useSelector((state) => state.artists.artists || [])
  const events = useSelector((state) => state.events.events || [])

  useEffect(() => {
    dispatch(getSongsAction(1000))
    dispatch(getArtistsAction(500))
    dispatch(getEventsAction(200))
  }, [])

  const results =
    {
      song: songs.filter((s) => s.title?.toLowerCase().includes(query)),
      artist: artists.filter((a) =>
        a.artistName?.toLowerCase().includes(query),
      ),
      event: events.filter((e) => e.title?.toLowerCase().includes(query)),
    }[type] || []

  const renderCard = (item) => {
    if (type === "song")
      return (
        <div
          className="search-card"
          key={item.id}
          onClick={() => navigate(`/songs/${item.id}`)}
        >
          {item.cover && (
            <img
              src={item.cover}
              alt={item.artistName}
              className="search-card__img"
            />
          )}
          <div className="search-card__info">
            <p className="search-card__title">{item.title}</p>
            <p className="search-card__sub">
              {item.artists?.[0]?.artistName || "Unknown artist"}
            </p>
          </div>
        </div>
      )

    if (type === "artist")
      return (
        <div
          key={item.id}
          className="search-card"
          onClick={() => navigate(`/artists/${item.id}`)}
        >
          {item.avatar && (
            <img
              src={item.avatar}
              alt={item.artistName}
              className="search-card__img search-card__img--round"
            />
          )}
          <div className="search-card__info">
            <p className="search-card__title">{item.artistName}</p>
            <p className="search-card__sub">{item.genre || ""}</p>
          </div>
        </div>
      )

    if (type === "event")
      return (
        <div
          key={item.id}
          className="search-card"
          onClick={() => navigate(`/events/${item.id}`)}
        >
          {console.log(item)}
          {item.cover && (
            <img
              src={item.cover}
              alt={item.title}
              className="search-card__img"
            />
          )}
          <div className="search-card__info">
            <p className="search-card__title">{item.title}</p>
            <p className="search-card__sub">
              {item.location || ""}{" "}
              {item.date ? `· ${new Date(item.date).toLocaleDateString()}` : ""}
            </p>
          </div>
        </div>
      )
  }

  return (
    <>
      <Navbar />
      <div className="search-page">
        <h1 className="search-page__heading">
          Results for <span>"{searchParams.get("q")}"</span>
        </h1>
        <p className="search-page__meta">
          {results.length} {type}
          {results.length !== 1 ? "s" : ""} found
        </p>

        {results.length === 0 ? (
          <p className="search-page__empty">No {type}s match your search.</p>
        ) : (
          <div className="search-grid">{results.map(renderCard)}</div>
        )}
      </div>
    </>
  )
}

export default SearchPage

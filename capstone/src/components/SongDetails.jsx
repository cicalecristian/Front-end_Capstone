import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { getSingleSongAction } from "../redux/actions/songAction"

const SongDetails = () => {
  const dispatch = useDispatch()

  const { id } = useParams()

  const song = useSelector((state) => state.songs.singleSong)

  const loading = useSelector((state) => state.songs.loading)

  useEffect(() => {
    dispatch(getSingleSongAction(id))
  }, [dispatch, id])

  if (loading) {
    return <p>Loading...</p>
  }

  if (!song) {
    return <p>Song not found</p>
  }

  return (
    <div>
      <img src={song.cover} alt={song.title} />

      <h1>{song.title}</h1>

      <p>{song.genre}</p>
    </div>
  )
}

export default SongDetails

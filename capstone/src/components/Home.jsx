import TrendingArtists from "./TrendingArtists"
import TrendingEvents from "./TrendingEvents"
import TrendingSongs from "./TrendingSongs"
import { Container } from "react-bootstrap"

const Home = () => {
  return (
    <Container fluid className=" g-0">
      <TrendingSongs />
      <TrendingArtists />
      <TrendingEvents />
    </Container>
  )
}

export default Home

import TrendingArtists from "./TrendingArtists"
import TrendingSongs from "./TrendingSongs"
import { Container } from "react-bootstrap"

const Home = () => {
  return (
    <Container fluid className=" g-0">
      <TrendingSongs />
      <TrendingArtists />
    </Container>
  )
}

export default Home

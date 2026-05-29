import { Container } from "react-bootstrap"
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa"
import "./Footer.css"

const Footer = () => {
  return (
    <footer className="jm jm-footer">
      <Container fluid className="jm jm-footer__inner">
        <div className="jm jm-footer__brand">
          <span>♪</span>
          <div>
            <p>JUST MUSIC</p>
            <small>Discover artists, songs and live events.</small>
          </div>
        </div>

        <div className="jm jm-footer__info">
          <a href="mailto:support@justmusic.com">support@justmusic.com</a>

          <div className="jm jm-footer__socials">
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" aria-label="TikTok">
              <FaTiktok />
            </a>
            <a href="#" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>

        <p className="jm jm-footer__copy">
          © {new Date().getFullYear()} Just Music
        </p>
      </Container>
    </footer>
  )
}

export default Footer

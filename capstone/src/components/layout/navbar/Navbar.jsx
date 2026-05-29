import { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { Nav, Button, Container, Form } from "react-bootstrap"
import { logoutAction } from "../../../redux/actions/authAction"
import "./Navbar.css"

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { user, token } = useSelector((state) => state.auth)

  const [searchQuery, setSearchQuery] = useState("")
  const [searchCategory, setSearchCategory] = useState("song")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    navigate(
      `/search?q=${encodeURIComponent(searchQuery.trim())}&type=${searchCategory}`,
    )
    setSearchQuery("")
    setMobileMenuOpen(false)
  }

  const handleLogout = () => {
    dispatch(logoutAction())
    setDropdownOpen(false)
    navigate("/login")
  }

  const handleLogoClick = () => {
    if (location.pathname !== "/home") {
      navigate("/home")
    }
  }

  return (
    <Nav as="nav" className="jm jm-navbar">
      <Container fluid className="jm jm-navbar__inner">
        <Nav.Item className="jm jm-brand" onClick={handleLogoClick}>
          <span>♪</span>
          <span className="jm jm-brand__text">JUST MUSIC</span>
        </Nav.Item>

        <Form className="jm jm-search" onSubmit={handleSearch}>
          <div className="jm jm-search__box">
            <input
              type="text"
              className="jm jm-search__input"
              placeholder={`Search ${searchCategory}s…`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="jm jm-search__tabs">
              {["song", "artist", "event"].map((cat) => (
                <Button
                  key={cat}
                  className={`jm jm-search__tab ${searchCategory === cat ? "jm-search__tab--active" : ""}`}
                  onClick={() => setSearchCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </Form>

        <div className="jm jm-actions">
          <Button
            className="jm jm-icon-btn jm-icon-btn--heart"
            onClick={() => navigate("/favorites")}
            title="Favorites"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </Button>

          <Button
            className="jm jm-icon-btn jm-icon-btn--calendar"
            onClick={() => navigate("/bookings")}
            title="Booked Events"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </Button>

          <div className="jm jm-profile" ref={dropdownRef}>
            <Button
              className="jm jm-profile__btn"
              onClick={() => setDropdownOpen((v) => !v)}
              title="Account"
            >
              <span className="jm jm-profile__initial">
                {user?.username ? user.username[0].toUpperCase() : "U"}
              </span>
            </Button>

            {dropdownOpen && (
              <div className="jm jm-dropdown">
                {token ? (
                  <>
                    <p className="jm jm-dropdown__username">
                      {user?.username || "Account"}
                    </p>
                    <Button
                      className="jm jm-dropdown__item"
                      onClick={() => {
                        navigate("/profile")
                        setDropdownOpen(false)
                      }}
                    >
                      Profile
                    </Button>
                    <Button
                      className="jm jm-dropdown__item jm-dropdown__item--danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      className="jm jm-dropdown__item"
                      onClick={() => {
                        navigate("/login")
                        setDropdownOpen(false)
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      className="jm jm-dropdown__item"
                      onClick={() => {
                        navigate("/register")
                        setDropdownOpen(false)
                      }}
                    >
                      Register
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>

          <Button
            className="jm jm-hamburger"
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </Button>
        </div>
      </Container>

      {mobileMenuOpen && (
        <div className="jm jm-mobile">
          <Form onSubmit={handleSearch}>
            <div className="jm jm-search__tabs jm-search__tabs--mobile">
              {["song", "artist", "event"].map((cat) => (
                <Button
                  key={cat}
                  className={`jm jm-search__tab ${searchCategory === cat ? "jm-search__tab--active" : ""}`}
                  onClick={() => setSearchCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
            <div className="jm jm-search__box">
              <input
                type="text"
                className="jm jm-search__input"
                placeholder={`Search ${searchCategory}s…`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </Form>
          <div className="jm jm-mobile__links">
            <Button
              className="jm jm-mobile__link"
              onClick={() => {
                navigate("/favorites")
                setMobileMenuOpen(false)
              }}
            >
              ❤️ Favorites
            </Button>
            <Button
              className="jm jm-mobile__link"
              onClick={() => {
                navigate("/bookings")
                setMobileMenuOpen(false)
              }}
            >
              📅 Booked Events
            </Button>
            <Button
              className="jm jm-mobile__link"
              onClick={() => {
                navigate("/profile")
                setMobileMenuOpen(false)
              }}
            >
              👤 Profile
            </Button>
            {token && (
              <Button
                className="jm jm-mobile__link jm-mobile__link--logout"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      )}
    </Nav>
  )
}

export default Navbar

import { Navbar, Nav, Container, Button, Offcanvas } from "react-bootstrap";
import {
  FaDice,
  FaChess,
  FaTicketAlt,
  FaGift,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import LogoBogart from "../LogoBogart";
import useTheme from "../../content/hooks/useTheme";
import SigninModal from "../ModalLogin";
import LanguageDropdown from "./LanguageDropdown";
import Loading from "../common/loading";
import useCmsPage from "../../content/hooks/useCmsPage";

export default function AppNavbar() {
  const [showLogin, setShowLogin] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const { page, loading, error, getBlocks, getText } = useCmsPage("Header");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  if (!page) return <div>No content found</div>;

  const p = getBlocks("p");

  return (
    <>
      <Navbar
        expand="lg"
        collapseOnSelect
        fixed="top"
        className={`navbar-custom ${scrolled ? "navbar-scrolled" : ""}`}
      >
        <Container fluid className="mx-0 mx-lg-5">
          <Navbar.Toggle
            aria-controls="main-navbar"
            className="border-0 shadow-none me-2"
          />

          <Navbar.Brand
            as={Link}
            to="/"
            className="mx-auto navbar-brand mx-lg-0"
          >
            <LogoBogart />
          </Navbar.Brand>

          <Navbar.Offcanvas
            aria-labelledby="main-navbar-label"
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="main-navbar-label">
                {getText(p[0]?.content)}
              </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
              <div className="d-lg-none mt-4 text-center">
                <Button
                  as={Link}
                  to="/login"
                  className="btn-outline-white w-75 mb-2"
                >
                  {getText(p[1]?.content)}
                </Button>

                <Button
                  as={Link}
                  to="/register"
                  className="btn-yellow w-75 mb-3"
                >
                  {getText(p[2]?.content)}
                </Button>
              </div>

              <Nav className="mx-lg-auto mx-5 text-start text-lg-center gap-lg-4 text-uppercase fw-bold">
                <Nav.Link as={NavLink} to="/casino" className="nav-link-custom">
                  <FaDice className="me-2 mb-2" />
                  {getText(p[3]?.content)}
                </Nav.Link>

                <Nav.Link
                  as={NavLink}
                  to="/live-casino"
                  className="nav-link-custom"
                >
                  <FaChess className="me-2 mb-2" />
                  {getText(p[4]?.content)}
                </Nav.Link>

                <Nav.Link
                  as={NavLink}
                  to="/lottery"
                  className="nav-link-custom"
                >
                  <FaTicketAlt className="me-2 mb-1" />
                  {getText(p[5]?.content)}
                </Nav.Link>

                <Nav.Link
                  as={NavLink}
                  to="/promotions"
                  className="nav-link-custom"
                >
                  <FaGift className="me-2 mb-1" />
                  {getText(p[6]?.content)}
                </Nav.Link>

                <div className="d-lg-none mt-4 text-start text-lg-center pt-4 border-top">
                  <Nav.Link as={NavLink} to="about" className="nav-link-custom">
                    {getText(p[7]?.content)}
                  </Nav.Link>

                  <Nav.Link
                    as={NavLink}
                    to="/cashier"
                    className="nav-link-custom"
                  >
                    {getText(p[8]?.content)}
                  </Nav.Link>

                  <Nav.Link
                    as={NavLink}
                    to="/rules"
                    className="nav-link-custom"
                  >
                    {getText(p[9]?.content)}
                  </Nav.Link>

                  <Nav.Link
                    as={NavLink}
                    to="/contact"
                    className="nav-link-custom"
                  >
                    {getText(p[10]?.content)}
                  </Nav.Link>

                  <Nav.Link
                    as={NavLink}
                    to="https://www.affcorner.com/bogart-casino-affiliates"
                    className="nav-link-custom"
                  >
                    {getText(p[11]?.content)}
                  </Nav.Link>

                  <Nav.Link
                    as={NavLink}
                    to="https://partner2.bogartcasino.ag/login"
                    className="nav-link-custom"
                  >
                    {getText(p[12]?.content)}
                  </Nav.Link>
                </div>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>

          <div className="d-none d-lg-flex align-items-center gap-3">
            <Button
              onClick={() => setShowLogin(true)}
              className="btn-outline-white"
            >
              {getText(p[1]?.content)}
            </Button>

            <SigninModal
              show={showLogin}
              handleClose={() => setShowLogin(false)}
            />

            <Button
              as={Link}
              to="/register"
              className="btn-yellow"
            >
              {getText(p[2]?.content)}
            </Button>
          </div>

          <div className="d-flex align-items-center gap-3">
            <LanguageDropdown />
          </div>

          <Button
            onClick={toggleTheme}
            className="btn-rounded-black theme-toggle ms-3"
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </Button>
        </Container>
      </Navbar>
    </>
  );
}

import { Col, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import gaLogo from "../../assets/FooterLogos/gaLogo.png";
import bitcoinLogo from "../../assets/FooterLogos/bitcoin-accepted.svg";
import sslLogo from "../../assets/FooterLogos/sslcLogo.png";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import LogoBogart from "../LogoBogart";
import useLicenseSeal from "../../content/hooks/useLicenseSeal";
import BankingMethods from "../BankingMethods";
import Loading from "../common/loading";
import useCmsPage from "../../content/hooks/useCmsPage";

export default function Footer() {
  const licenceRef = useLicenseSeal();
  const { page, loading, error, getBlocks, getText } = useCmsPage("Footer");

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  if (!page) return <div>No content found</div>;

  const p = getBlocks("p");

  return (
    <Container fluid className="footer-custom">
      <Row className="justify-content-around container mx-auto text-center pt-5">
        <Col xs={6} md="auto">
          <a href="/about">{getText(p[0]?.content)}</a>
        </Col>
        <Col xs={6} md="auto">
          <a href="/cashier">{getText(p[1]?.content)}</a>
        </Col>
        <Col xs={6} md="auto">
          <a href="/rules">{getText(p[2]?.content)}</a>
        </Col>
        <Col xs={6} md="auto">
          <a href="/contact">{getText(p[3]?.content)}</a>
        </Col>
        <Col xs={6} md="auto">
          <a
            href="https://www.affcorner.com/bogart-casino-affiliates"
            target="_blank"
            rel="noopener noreferrer"
          >
            {getText(p[4]?.content)}
          </a>
        </Col>
        <Col xs={6} md="auto">
          <a
            href="https://partner2.bogartcasino.ag/login"
            target="_blank"
            rel="noopener noreferrer"
          >
            {getText(p[5]?.content)}
          </a>
        </Col>
      </Row>

      <Row className="border-top border-bottom text-center p-5 my-5 justify-content-center mx-auto">
        <Col xs="12" md="4">
          <LogoBogart width={150} as={Link} to="/" />
        </Col>
        <Col xs="12" md="4" className="py-3">
          <h3 className="fw-bold">
            {getText(p[6]?.content)}{" "}
            <a
              className="text-reset text-decoration-none"
              href="tel:1-888-740-1896"
            >
              1-888-740-1896
            </a>
          </h3>
        </Col>
        <Col xs="12" md="4">
          <Row>
            <Col>
              <Row className="justify-content-center align-items-center">
                <Col xs="auto">
                  <div ref={licenceRef}></div>
                </Col>

                <Col xs="auto">
                  <img src={gaLogo} alt="GA Logo" width={50} />
                </Col>

                <Col xs="auto">
                  <img src={bitcoinLogo} alt="Bitcoin" width={80} />
                </Col>

                <Col xs="auto">
                  <img src={sslLogo} alt="SSL" width={80} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <BankingMethods />
      </Row>

      <Row className="text-center">
        <Col>
          <p className="follow-text">{getText(p[7]?.content)}</p>

          <div className="social-icons">
            <a
              href="https://www.facebook.com/WinatBogart/"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebookSquare />
            </a>

            <a href="https://x.com/winatbogart" target="_blank" rel="noreferrer">
              <FaSquareXTwitter />
            </a>

            <a
              href="https://www.instagram.com/winatbogart"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagramSquare />
            </a>
          </div>

          <p className="text-secondary small">{getText(p[8]?.content)}</p>

          <p className="small mt-2 mb-5">{getText(p[9]?.content)}</p>
        </Col>
      </Row>
    </Container>
  );
}

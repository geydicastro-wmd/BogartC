import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Loading from "../components/common/loading";
import useCmsPage from "../content/hooks/useCmsPage";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import HeroLiveCasino from "../assets/Skin/bogart-live-casino.jpg";
import LiveBaccarat from "../assets/Skin/bogart_casino_livebaccarat.png";
import LiveBlackJack from "../assets/Skin/bogart_casino_liveblackjack.png";
import LiveRoulette from "../assets/Skin/bogart_casino_liveroulette.png";

export default function LiveCasino() {
  const { page, translation, loading, error, getBlocks, getText, renderHtml } =
    useCmsPage("LiveCasino");

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  if (!page) return <div>No content found</div>;

  const h1 = getBlocks("h1");
  const h2 = getBlocks("h2");
  const h5 = getBlocks("h5");
  const p = getBlocks("p");

  return (
    <>
      {translation && (
        <Helmet>
          <title>{translation.meta_title || page.title}</title>
        </Helmet>
      )}

      <div className="container hero-casino overflow-hidden text-center mt-5">
        <Image
          src={HeroLiveCasino}
          alt="Live Casino"
          rounded
          fluid
        />
      </div>

      <Container className="my-3">
        <Row className="justify-content-center text-center">
          <Col lg={10}>
            {h1?.[0] && (
              <h1 className="fw-bold mb-3">{getText(h1[0].content)}</h1>
            )}

            {h2?.[0] && <h2 className="mb-3 text-muted">{h2[0].content}</h2>}

            {p[0] && (
              <p
                className="mb-0 text-secondary small"
                dangerouslySetInnerHTML={renderHtml(p[0].content)}
              />
            )}
          </Col>
        </Row>

        <Row className="mt-5 justify-content-center">
          <Col lg={12}>
            {[
              {
                image: LiveBaccarat,
                title: h5[0]?.content,
                body: p[1]?.content,
              },
              {
                image: LiveBlackJack,
                title: h5[1]?.content,
                body: p[2]?.content,
                reverse: true,
              },
              {
                image: LiveRoulette,
                title: h5[2]?.content,
                body: p[3]?.content,
              },
            ].map((card, index) => (
              <Card className="border-0 mb-4" key={index}>
                <Row className="g-0 align-items-stretch">
                  <Col
                    lg={5}
                    className={`d-flex ${card.reverse ? "order-lg-2" : ""}`}
                  >
                    <div className="live-img-wrapper">
                      <Image
                        src={card.image}
                        alt={card.title || "Live Casino"}
                        className="w-100 thm-img rounded"
                      />
                    </div>
                  </Col>

                  <Col
                    lg={7}
                    className={`d-flex align-items-center ${card.reverse ? "order-lg-1" : ""}`}
                  >
                    <Card.Body>
                      <Card.Title className="fw-bold mb-3 text-center">
                        {card.title && <h5>{card.title}</h5>}
                      </Card.Title>

                      {card.body && (
                        <p
                          className="text-secondary small px-3"
                          dangerouslySetInnerHTML={renderHtml(card.body)}
                        />
                      )}

                      <div className="d-flex flex-column flex-md-row justify-content-center text-center gap-3 mt-3">
                        <Button as={Link} to="/Login" className="btn-yellow fw-bold px-4">
                          {getText(p[4]?.content)}
                        </Button>
                        <Button
                          as={Link}
                          to="/Register"
                          className="btn-outline-white"
                        >
                          {getText(p[5]?.content)}
                        </Button>
                      </div>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
}

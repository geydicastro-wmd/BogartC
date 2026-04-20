import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const LiveCasinoContent = () => {
  const cardsData = [
    {
      title: "LIVE BACCARAT",
      img: "/src/assets/Skin/bogart_casino_livebaccarat.png",
      text: "Join us for an exhilarating live baccarat experience! Engage with professional dealers in real-time as you test your luck and strategy. Feel the thrill of the casino from the comfort of your home, with interactive gameplay and the chance to win big. Don’t miss out on the excitement—join our live baccarat table today and elevate your gaming experience!",
    },
    {
      title: "LIVE BLACKJACK",
      img: "/src/assets/Skin/bogart_casino_liveblackjack.png",
      text: "Enjoy the excitement of the casino atmosphere from your own home, where you can interact with the dealers and fellow players. Don’t wait—join us now for an unforgettable live blackjack experience and see if you have what it takes to beat the house!",
      reverse: true,
    },
    {
      title: "LIVE ROULETTE",
      img: "/src/assets/Skin/bogart_casino_liveroulette.png",
      text: "Get ready for the ultimate thrill with our live roulette games! Experience the excitement of the spinning wheel and the anticipation of the ball landing on your chosen number. Whether you’re a seasoned player or new to the game, the lively atmosphere will keep you on the edge of your seat. Join us now for an unforgettable live roulette experience and see where your luck takes you!",
    },
  ];

  return (
    <>
      {/* Breadcrumb
      <Container fluid className="mt-5">
        <Breadcrumbs />
      </Container> */}

      {/* Hero */}
      <div className="container hero-casino overflow-hidden text-center mt-2">
        <Image
          src="/src/assets/Skin/bogart-live-casino.jpg"
          alt="Live Casino"
          rounded
          fluid
        />
      </div>

      <p className="live fw-bold text-center mb-2">
        ● LIVE NOW – Tables Open 24/7
      </p>

      {/* Content */}
      <Container className="my-3">
        <Row className="justify-content-center text-center">
          <Col lg={10}>
            <h1 className="fw-bold mb-3">
              Live Casino Games with Real Dealers – Play Blackjack, Roulette &
              More
            </h1>

            <h3 className="mb-3 text-muted">
              Step into the Action – Live Casino Awaits!
            </h3>

            <p className="mb-0 text-secondary small">
              Enjoy the excitement of real-time casino gaming with our live
              dealer tables. Play blackjack, roulette, baccarat, and
              more—streamed in HD and available 24/7. Whether you're aiming for
              a big win or just love classic table games, the action never
              stops. Take your seat and play now!
            </p>
          </Col>
        </Row>

        {/* Cards */}
        <Row className="mt-5 justify-content-center">
          <Col lg={12}>
            {cardsData.map((card, index) => (
              <Card key={index} className="border-0 mb-4">
                <Row className="g-0 align-items-stretch">
                  {/* Imagen */}
                  <Col
                    lg={5}
                    className={`d-flex ${card.reverse ? "order-lg-2" : ""}`}
                  >
                    <div className="live-img-wrapper">
                      <Image
                        src={card.img}
                        alt={card.title}
                        className="w-100 thm-img rounded"
                      />
                    </div>
                  </Col>

                  {/* Texto */}
                  <Col lg={7} className={`d-flex align-items-center ${card.reverse ? "order-lg-1" : ""}`}>
                    <Card.Body className="">
                      <Card.Title className="fw-bold mb-3 text-center">
                        <span className="live-badge me-2">LIVE</span>
                        {card.title}
                      </Card.Title>

                      <Card.Text className="text-secondary small px-3">
                        {card.text}
                      </Card.Text>

                      <div className="d-flex flex-column flex-md-row justify-content-center text-center gap-3 mt-3">
                        <Button
                          as={Link}
                          to="/Login"
                          className="btn-yellow fw-bold px-4"
                        >
                          Play Now
                        </Button>
                        <Button
                          as={Link}
                          to="/Register"
                          className="btn-outline-white"
                        >
                          Open a Free Account
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
};

export default LiveCasinoContent;

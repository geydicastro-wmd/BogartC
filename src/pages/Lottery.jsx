import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../components/common/loading";
import useCmsPage from "../content/hooks/useCmsPage";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import daily3Img from "../assets/Skin/lottery/daily3table.png";
import daily4Img from "../assets/Skin/lottery/daily4table.png";
import Daily3 from "../assets/Skin/lottery/bogart-lotto-daily-3.png"
import Daily4 from "../assets/Skin/lottery/bogart-lotto-daily-4.png"
import LotteryTable from "../components/pages/LotteryTable";
import California from "../assets/Skin/lottery/california.png";
import NewYork from "../assets/Skin/lottery/newyork.png";
import Texas from "../assets/Skin/lottery/texas.png";
import HeroLotteryMobile from "../assets/Skin/lottery/bogart-lottery-mobile.jpg";
import HeroLotteryDesktop from "../assets/Skin/lottery/bogart-lottery-desktop.png";
import LottoLogin from "../assets/Skin/lottery/lotto-login.png";
import LottoDaily from "../assets/Skin/lottery/lotto-daily.png";
import LottoState from "../assets/Skin/lottery/lotto-state.png";
import LottoEvent from "../assets/Skin/lottery/lotto-event.png";
import LottoStraight from "../assets/Skin/lottery/lotto-straight.png";
import LottoSubmit from "../assets/Skin/lottery/lotto-submit.png";
import ball01 from "../assets/Skin/lottery/lottery-balls/lottery-ball_01.svg";
import ball02 from "../assets/Skin/lottery/lottery-balls/lottery-ball_02.svg";
import ball03 from "../assets/Skin/lottery/lottery-balls/lottery-ball_02.svg";
import ball04 from "../assets/Skin/lottery/lottery-balls/lottery-ball_03.svg";
import ball05 from "../assets/Skin/lottery/lottery-balls/lottery-ball_04.svg";
import ball06 from "../assets/Skin/lottery/lottery-balls/lottery-ball_04.svg";

export default function Lottery() {
  const { page, loading, error, getBlocks, renderHtml } = useCmsPage("Lottery");

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  if (!page) return <div>No content found</div>;

  const h1 = getBlocks("h1");
  const h2 = getBlocks("h2");
  const h3 = getBlocks("h3");
  const h4 = getBlocks("h4");
  const p = getBlocks("p");
  const divs = getBlocks("div");

  const states = [
    {
      name: h3[0]?.content || "California",
      img: California,
      schedule: p[0]?.content || "Every day",
      time: "1:00 p.m. & 6:30 p.m. PT",
    },
    {
      name: h3[1]?.content || "New York",
      img: NewYork,
      schedule: p[0]?.content || "Every day",
      time: "12:20 p.m. & 7:30 p.m. ET",
    },
    {
      name: h3[2]?.content || "Texas",
      img: Texas,
      schedule: p[1]?.content || "Monday through Saturday",
      time: "10:00 a.m., 12:27 p.m., 6:00 p.m. & 10:12 p.m.",
    },
  ];

  const steps = [
    {
      img: LottoLogin,
      ball: ball01,
      text: p[2]?.content || "Log in",
    },
    {
      img: LottoDaily,
      ball: ball02,
      text: p[3]?.content || "Select Daily 3 or Daily 4",
    },
    {
      img: LottoState,
      ball: ball03,
      text: p[4]?.content || "Choose your state",
    },
    {
      img: LottoEvent,
      ball: ball04,
      text: p[5]?.content || "Select draw",
    },
    {
      img: LottoStraight,
      ball: ball05,
      text: p[6]?.content || "Pick numbers & bet",
    },
    {
      img: LottoSubmit,
      ball: ball06,
      text: p[7]?.content || "Submit",
    },
  ];

  const daily3Data = [
    { bet: "<strong>Straight</strong>", ticket: "786", result: "786", prize: "$480" },
    { bet: "<strong>Box</strong> (3 different numbers)", ticket: "268", result: "628", prize: "$72" },
    { bet: "<strong>Box</strong> (2 like numbers)", ticket: "889", result: "898", prize: "$144" },
    { bet: "<strong>Straight / Box</strong><br/>(3 diff. numbers) Straight Win", ticket: "786", result: "786", prize: "$276" },
    { bet: "<strong>Straight / Box</strong><br/>(3 diff. numbers) Straight Loss", ticket: "786", result: "867", prize: "$36" },
    { bet: "<strong>Straight / Box</strong><br/>(2 like numbers) Straight Win", ticket: "363", result: "363", prize: "$312" },
    { bet: "<strong>Straight / Box</strong><br/>(2 like numbers) Straight Loss", ticket: "363", result: "633", prize: "$72" },
  ];

  const daily4Data = [
    { bet: "<strong>Straight</strong>", ticket: "8263", result: "8263", prize: "$4,000" },
    { bet: "<strong>Box</strong> (4 different numbers)", ticket: "3789", result: "9387", prize: "$160" },
    { bet: "<strong>Box</strong> (2 like numbers)", ticket: "2688", result: "8682", prize: "$320" },
    { bet: "<strong>Box</strong><br/>(2 sets of like numbers)", ticket: "8899", result: "8998", prize: "$640" },
    { bet: "<strong>Box</strong><br/>(3 like numbers)", ticket: "2227", result: "2272", prize: "$960" },
    { bet: "<strong>Straight / Box</strong><br/>(4 diff. numbers) Straight Win", ticket: "8263", result: "8263", prize: "$2,080" },
    { bet: "<strong>Straight / Box</strong><br/>(4 diff. numbers) Straight Loss", ticket: "8263", result: "6238", prize: "$80" },
    { bet: "<strong>Straight / Box</strong><br/>(2 like numbers) Straight Win", ticket: "3637", result: "3637", prize: "$2,160" },
    { bet: "<strong>Straight / Box</strong><br/>(2 like numbers) Straight Loss", ticket: "3637", result: "3736", prize: "$160" },
    { bet: "<strong>Straight / Box</strong><br/>(2 sets of like numbers) Straight Win", ticket: "9889", result: "9889", prize: "$2,320" },
    { bet: "<strong>Straight / Box</strong><br/>(2 sets of like numbers) Straight Loss", ticket: "9889", result: "8989", prize: "$320" },
    { bet: "<strong>Straight / Box</strong><br/>(3 like numbers) Straight Win", ticket: "3393", result: "3393", prize: "$2,480" },
    { bet: "<strong>Straight / Box</strong><br/>(3 like numbers) Straight Loss", ticket: "3393", result: "9333", prize: "$480" },
  ];

  return (
    <>
      <div className="container hero-casino overflow-hidden text-center mt-5">
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet={HeroLotteryMobile}
          />
          <source
            media="(min-width: 768px)"
            srcSet={HeroLotteryDesktop}
          />
          <img
            src={HeroLotteryDesktop}
            alt="Lottery"
            className="img-fluid rounded"
          />
        </picture>
      </div>

      <Container fluid className="my-3">
        <Container>
          <Row className="g-3">
            {[0, 1].map((columnIndex) => (
              <Col xs={12} lg={6} key={columnIndex}>
                <Image
                  src={
                    columnIndex ===  0 ? Daily3 : Daily4
                  }
                  fluid
                  className="mb-4"
                />

                <Row className="text-center">
                  {states.map((s, i) => (
                    <Col xs={12} md={4} key={i} className="p-2">
                      <Image src={s.img} fluid className="mb-2 lottery-icon" />
                      <h3 className="fw-bold">{s.name}</h3>
                      <p className="text-muted small mb-2">{s.schedule}</p>
                      <p>
                        <strong>{s.time}</strong>
                      </p>
                    </Col>
                  ))}
                </Row>

                <Row className="g-3 text-center">
                  <Col xs={12} sm={6} lg={6}>
                    <Card className="pay-card pay-card--in h-100">
                      <Card.Body>
                        {h4[0] && <p>{h4[0].content}</p>}
                        {h4[columnIndex === 0 ? 1 : 4] && (
                          <p>{h4[columnIndex === 0 ? 1 : 4].content}</p>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col xs={12} sm={6} lg={6}>
                    <Card className="pay-card pay-card--out h-100">
                      <Card.Body>
                        {h4[columnIndex === 0 ? 2 : 5] && (
                          <p>{h4[columnIndex === 0 ? 2 : 5].content}</p>
                        )}
                        {h4[columnIndex === 0 ? 3 : 6] && (
                          <p>{h4[columnIndex === 0 ? 3 : 6].content}</p>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Col>
            ))}
          </Row>
        </Container>

        <Container className="my-5 text-center">
          {h1[1] && (
            <h1
              className="fw-bold"
              dangerouslySetInnerHTML={renderHtml(h1[1].content)}
            />
          )}

          {h2[0] && <h2 dangerouslySetInnerHTML={renderHtml(h2[0].content)} />}
          {h2[1] && <h2 className="fw-bold mt-5">{h2[1].content}</h2>}
          {h3[3] && <h3 className="mb-3">{h3[3].content}</h3>}

          <Row>
            {steps.map((step, i) => (
              <Col lg={4} xs={12} key={i} className="mb-4">
                <div className="position-relative">
                  <Image src={step.img} fluid />
                  <div className="lottery-ball mt-3 position-absolute top-100 start-50 translate-middle">
                    <Image
                      src={step.ball}
                      fluid
                      width={60}
                    />
                  </div>
                </div>
                <p className="mt-5 pt-1">{step.text}</p>
              </Col>
            ))}
          </Row>
        </Container>

        <section className="payout-section py-4">
          <Container>
            {divs[0] && (
              <div dangerouslySetInnerHTML={renderHtml(divs[0].content)} />
            )}
          </Container>
        </section>

        <LotteryTable
          image={daily3Img}
          note="All prize amounts based on a wager of $1."
          data={daily3Data}
        />

        <LotteryTable
          image={daily4Img}
          note="All prize amounts based on a wager of $1."
          data={daily4Data}
        />

        <Container className="text-center my-5">
          <Button className="btn-outline-white" as={Link} to="/rules/lottery-rules">
            {p[8] && (
              <span dangerouslySetInnerHTML={renderHtml(p[8]?.content)} />
            )}
          </Button>
        </Container>
      </Container>
    </>
  );
}

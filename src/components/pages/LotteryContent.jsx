import React from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Card,
  Table,
  Button,
  Badge,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import LotteryTable from "./LotteryTable";
import daily3Img from "../../assets/skin/lottery/daily3table.png";
import daily4Img from "../../assets/skin/lottery/daily4table.png";
import Counter from "../Counter";

export default function LotteryContent() {
  const states = [
    {
      name: "California",
      img: "/src/assets/skin/lottery/california.png",
      schedule: "Every day",
      time: "1:00 p.m. & 6:30 p.m. PT",
    },
    {
      name: "New York",
      img: "/src/assets/skin/lottery/newyork.png",
      schedule: "Every day",
      time: "12:20 p.m. & 7:30 p.m. ET",
    },
    {
      name: "Texas",
      img: "/src/assets/skin/lottery/texas.png",
      schedule: "Monday through Saturday",
      time: "10:00 a.m., 12:27 p.m., 6:00 p.m. & 10:12 p.m.",
    },
  ];

  const steps = [
    {
      img: "/src/assets/skin/lottery/lotto-login.png",
      ball: "01",
      text: "Log in",
    },
    {
      img: "/src/assets/skin/lottery/lotto-daily.png",
      ball: "02",
      text: "Select Daily 3 or Daily 4",
    },
    {
      img: "/src/assets/skin/lottery/lotto-state.png",
      ball: "03",
      text: "Choose your state",
    },
    {
      img: "/src/assets/skin/lottery/lotto-event.png",
      ball: "04",
      text: "Select draw",
    },
    {
      img: "/src/assets/skin/lottery/loto-straight.png",
      ball: "05",
      text: "Pick numbers & bet",
    },
    {
      img: "/src/assets/skin/lottery/loto-submit.png",
      ball: "06",
      text: "Submit",
    },
  ];

  const daily3Data = [
    {
      bet: "<strong>Straight</strong>",
      ticket: "786",
      result: "786",
      prize: "$480",
    },
    {
      bet: "<strong>Box</strong> (3 different numbers)",
      ticket: "268",
      result: "628",
      prize: "$72",
    },
    {
      bet: "<strong>Box</strong> (2 like numbers)",
      ticket: "889",
      result: "898",
      prize: "$144",
    },
    {
      bet: "<strong>Straight / Box</strong><br/>(3 diff. numbers) Straight Win",
      ticket: "786",
      result: "786",
      prize: "$276",
    },
    {
      bet: "<strong>Straight / Box</strong><br/>(3 diff. numbers) Straight Loss",
      ticket: "786",
      result: "867",
      prize: "$36",
    },
    {
      bet: "<strong>Straight / Box</strong><br/>(2 like numbers) Straight Win",
      ticket: "363",
      result: "363",
      prize: "$312",
    },
    {
      bet: "<strong>Straight / Box</strong><br/>(2 like numbers) Straight Loss",
      ticket: "363",
      result: "633",
      prize: "$72",
    },
  ];

  const daily4Data = [
    {
      bet: "<strong>Straight</strong>",
      ticket: "8263",
      result: "8263",
      prize: "$4,000",
    },
    {
      bet: "<strong>Box</strong> (4 different numbers)",
      ticket: "3789",
      result: "9387",
      prize: "$160",
    },
    {
      bet: "<strong>Box</strong> (2 like numbers)",
      ticket: "2688",
      result: "8682",
      prize: "$320",
    },
    {
      bet: "<strong>Box</strong><br/>(2 sets of like numbers)",
      ticket: "8899",
      result: "8998",
      prize: "$640",
    },
    {
      bet: "<strong>Box</strong><br/>(3 like numbers)",
      ticket: "2227",
      result: "2272",
      prize: "$960",
    },
    {
      bet: "<strong>Straight / Box</strong><br/>(4 diff. numbers) Straight Win",
      ticket: "8263",
      result: "8263",
      prize: "$2,080",
    },
    {
      bet: "<strong>Straight / Box</strong><br/>(4 diff. numbers) Straight Loss",
      ticket: "8263",
      result: "6238",
      prize: "$80",
    },
    {
      bet: "<strong>Straight / Box</strong><br/>(2 like numbers) Straight Win",
      ticket: "3637",
      result: "3637",
      prize: "$2,160",
    },
    {
      bet: "<strong>Straight / Box</strong><br/>(2 like numbers) Straight Loss",
      ticket: "3637",
      result: "3736",
      prize: "$160",
    },
    {
      bet: "<strong>Straight / Box</strong><br/>(2 sets of like numbers) Straight Win",
      ticket: "9889",
      result: "9889",
      prize: "$2,320",
    },
    {
      bet: "<strong>Straight / Box</strong><br/>(2 sets of like numbers) Straight Loss",
      ticket: "9889",
      result: "8989",
      prize: "$320",
    },
    {
      bet: "<strong>Straight / Box</strong><br/>(3 like numbers) Straight Win",
      ticket: "3393",
      result: "3393",
      prize: "$2,480",
    },
    {
      bet: "<strong>Straight / Box</strong><br/>(3 like numbers) Straight Loss",
      ticket: "3393",
      result: "9333",
      prize: "$480",
    },
  ];

  return (
    <>
      {/* Breadcrumb 
      <Container fluid className="mt-5">
        <Breadcrumbs />
      </Container>*/}

      {/* Hero */}
      <div className="container hero-casino overflow-hidden text-center mt-2">
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet="/src/assets/skin/lottery/bogart-lottery-mobile.jpg"
          />
          <source
            media="(min-width: 768px)"
            srcSet="/src/assets/skin/lottery/bogart-lottery-desktop.png"
          />
          <img
            src="/src/assets/skin/lottery/bogart-lottery-desktop.png"
            alt="Lottery"
            className="img-fluid rounded"
          />
        </picture>
      </div>

      <Container fluid className="my-3">
        {/* TOP SECTION */}
        <Container>
          <Row className="g-3">
            {/* LEFT - DAILY 3 */}
            <Col xs={12} lg={6}>
              <Image
                src="/src/assets/skin/lottery/bogart-lotto-daily-3.png"
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
                {/* DAILY 3 STRAIGHT */}
                <Col xs={12} sm={6} lg={6}>
                  <Card className="payout-card h-100">
                    <Card.Body>
                      <small className="text-muted">Daily 3</small>
                      <h6 className="fw-bold">Straight</h6>
                      <p className="mb-2 small">Exact order</p>
                      <h4 className="payout-amount">$480</h4>
                      <span className="small text-muted">$1 Ticket</span>
                    </Card.Body>
                  </Card>
                </Col>

                {/* DAILY 3 BOX */}
                <Col xs={12} sm={6} lg={6}>
                  <Card className="payout-card h-100">
                    <Card.Body>
                      <small className="text-muted">Daily 3</small>
                      <h6 className="fw-bold">Box (3 diff)</h6>
                      <p className="mb-2 small">Any order</p>
                      <h4 className="payout-amount">$72</h4>
                      <span className="small text-muted">$1 Ticket</span>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>

            {/* RIGHT - DAILY 4 */}
            <Col xs={12} lg={6}>
              <Image
                src="/src/assets/skin/lottery/bogart-lotto-daily-4.png"
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
                {/* DAILY 4 STRAIGHT */}
                <Col xs={12} sm={6} lg={6}>
                  <Card className="payout-card h-100">
                    <Card.Body>
                      <small className="text-muted">Daily 4</small>
                      <h6 className="fw-bold">Straight</h6>
                      <p className="mb-2 small">Exact order</p>
                      <h4 className="payout-amount">$4,000</h4>
                      <span className="small text-muted">$1 Ticket</span>
                    </Card.Body>
                  </Card>
                </Col>

                {/* DAILY 4 BOX */}
                <Col xs={12} sm={6} lg={6}>
                  <Card className="payout-card h-100">
                    <Card.Body>
                      <small className="text-muted">Daily 4</small>
                      <h6 className="fw-bold">Box (4 diff)</h6>
                      <p className="mb-2 small">Any order</p>
                      <h4 className="payout-amount">$160</h4>
                      <span className="small text-muted">$1 Ticket</span>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>

        {/* HOW TO PLAY */}
        <Container className="my-5 text-center">
          <h1 className="fw-bold">Daily 3 & Daily 4 Lottery</h1>
          <h4 className="mb-4">Playing is easy. Follow these steps:</h4>

          <Row>
            {steps.map((step, i) => (
              <Col lg={4} xs={12} key={i} className="mb-4">
                <div className="position-relative">
                  <Image src={step.img} fluid />
                  <div className="lottery-ball mt-3 position-absolute top-100 start-50 translate-middle">
                    <Image
                      src={`/src/assets/skin/lottery/lottery-balls/lottery-ball_${step.ball}.svg`}
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

        {/* COPY */}

        <section className="payout-section py-4">
          <Container>
            {/* TITLE */}
            <h3 className="mb-3 fw-bold text-center">Payout Tables</h3>

            <p className="text-muted mb-4 text-center">
              Win a prize by matching your Daily 3 or Daily 4 numbers in one of two ways:
            </p>

            {/* EXTRA INFO */}
            <ul className="text-muted small mb-2">
              <li>Straight: Match all digits in the exact order drawn.</li>
              <li>Box: Match all digits in any order, depending on digit combinations.</li>
            </ul>

            <p className="text-muted mb-4">
              The payout depends on the numbers selected and the type of play. Straight plays offer the highest rewards, while box plays provide more flexibility in how numbers can match.
            </p>

            <p className="text-muted mb-4">
              For example:
            </p>

            <ul className="text-muted small mb-2">
              <li>A Daily 3 straight win (e.g., 786 matched as 786) pays 480 to 1.</li>
              <li>A Daily 4 straight win (e.g., 7863 matched as 7863) pays 4,000 to 1.</li>
            </ul>

            <p className="text-muted small">
              You can also play <strong>Straight / Box</strong> to win both
              ways: full payout for exact match or partial payout for any order.
            </p>
          </Container>
        </section>

        {/* TABLES */}

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

        {/* CTA */}
        <Container className="text-center my-5">
          <Button
            className="btn-outline-white"
            as={Link}
            to="/rules/lottery-rules"
          >
            Terms and Conditions
          </Button>
        </Container>
      </Container>
    </>
  );
}

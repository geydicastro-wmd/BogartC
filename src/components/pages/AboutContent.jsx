import React from "react";
import { Container, Row, Col, Button, Card, Carousel } from "react-bootstrap";
import { useEffect, useState } from "react";
import { FaShieldAlt, FaBolt, FaGift, FaGamepad } from "react-icons/fa";
import SlotVideo from "../../assets/videos/SlotVideo.mp4";

const features = [
  {
    title: "Secure Gaming",
    desc: "Top-tier encryption & protection",
    icon: <FaShieldAlt />,
  },
  {
    title: "Fast Payouts",
    desc: "Withdraw your winnings instantly",
    icon: <FaBolt />,
  },
  { title: "Big Bonuses", desc: "Generous rewards & promos", icon: <FaGift /> },
  {
    title: "Game Variety",
    desc: "Hundreds of games available",
    icon: <FaGamepad />,
  },
];

const stats = [
  { value: 50, suffix: "M+", label: "Paid Out" },
  { value: 100, suffix: "K+", label: "Players" },
  { value: 1000, suffix: "+", label: "Games" },
  { value: 24, suffix: "/7", label: "Support" },
];

const games = [
  { title: "Slots", img: "https://via.placeholder.com/1200x400" },
  { title: "Live Casino", img: "https://via.placeholder.com/1200x400" },
  { title: "Table Games", img: "https://via.placeholder.com/1200x400" },
];

function Counter({ end, duration = 2000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count}</span>;
}

export default function AboutContent() {
  return (
<>
    <div className="about-page text-light">
      {/* FEATURES */}
      <Container className="my-5">
        <Row className="g-4 text-center">
          {features.map((f, i) => (
            <Col md={3} key={i}>
              <div className="feature-card p-4 h-100">
                <div className="icon mb-3">{f.icon}</div>
                <h5 className="mt-3">{f.title}</h5>
                <p>{f.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* STATS */}
      <div className="stats-section py-5 text-center">
        <Container>
          <Row>
            {stats.map((s, i) => (
              <Col md={3} key={i}>
                <h2>
                  <Counter end={500} />+
                </h2>
                <p>{s.label}</p>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* VIDEO */}

      <Container className="my-5 text-center">
        <h2 className="my-2 text-secondary fw-bolder"> ★ Experience the Action ★ </h2>

        <video autoPlay loop muted playsInline className="w-100 rounded">
          <source src={SlotVideo} type="video/mp4" />
        </video>
      </Container>

      

      {/* CAROUSEL 
      <Container className="my-5">
        <Carousel>
          {games.map((g, i) => (
            <Carousel.Item key={i}>
              <img className="d-block w-100" src={g.img} alt={g.title} />
              <Carousel.Caption>
                <h3>{g.title}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>*/}


      {/* CTA */}
      <div className="text-center my-5">
        <h2>Ready to Win Big?</h2>
        <Button size="lg" className="btn-yellow my-3">
          Join Now
        </Button>
      </div>
    </div>
    </>
  );
}

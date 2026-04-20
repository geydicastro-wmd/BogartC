import { Container, Row, Col, Card } from "react-bootstrap";
import { FaPhoneAlt, FaEnvelope, FaCommentDots } from "react-icons/fa";

const ContactCards = () => {
  return (
    <section className="contact-cards">
      <Container>
        <Row className="g-4">

          {/* CALL */}
          <Col md={4}>
            <Card className="contact-card text-center h-100">
              <Card.Body>
                <div className="icon">
                  <FaPhoneAlt />
                </div>
                <hr />
                <h4>GIVE US A FREE CALL</h4>

                <p className="label text-secondary fw-bold">Customer Service:</p>
                <p className="highlight">1-888-740-1896</p>

                <p className="label text-secondary fw-bold">Mexico</p>
                <p className="highlight">800-248-3779</p>
              </Card.Body>
            </Card>
          </Col>

          {/* EMAIL */}
          <Col md={4}>
            <Card className="contact-card text-center h-100">
              <Card.Body>
                <div className="icon">
                  <FaEnvelope />
                </div>
                <hr />
                <h4>SEND US AN E-MAIL</h4>

                <p className="label text-secondary fw-bold">Customer Service:</p>
                <p className="highlight">cs@bogartcasino.ag</p>

                <p className="label text-secondary fw-bold">Compliance:</p>
                <p className="highlight">documents@bogartcasino.ag</p>

                <p className="label text-secondary fw-bold">Affiliates:</p>
                <p className="highlight">affiliates@bogartcasino.ag</p>
              </Card.Body>
            </Card>
          </Col>

          {/* CHAT */}
          <Col md={4}>
            <Card className="contact-card text-center h-100">
              <Card.Body>
                <div className="icon">
                  <FaCommentDots />
                </div>
                <hr />
                <h4>SEND US A MESSAGE</h4>

                <p className="label fw-bold text-secondary">Live Chat Support</p>
                <p>
                  Our Customer Service staff is available 7 days a week between:
                </p>

                <p className="highlight">7:00 am - 7:00 pm PST.</p>
                <p className="highlight">10:00 am - 11:00 pm EST.</p>
              </Card.Body>
            </Card>
          </Col>

        </Row>
      </Container>
    </section>
  );
};

export default ContactCards;
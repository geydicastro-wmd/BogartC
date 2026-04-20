import { Container, Row, Col, Card } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import Loading from "../components/common/loading";
import InternalHeader from "../components/InternalHeader";
import useCmsPage from "../content/hooks/useCmsPage";
import { FaPhoneAlt, FaEnvelope, FaCommentDots } from "react-icons/fa";

export default function Contact() {
  const { page, translation, loading, error, getBlocks, getText } =
    useCmsPage("ContactUs");

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  if (!page) return <div>No content found</div>;

  const h1 = getBlocks("h1");
  const h4 = getBlocks("h4");
  const p = getBlocks("p");

  return (
    <Container>
      {translation && (
        <Helmet>
          <title>{translation.meta_title || page.title}</title>
        </Helmet>
      )}

      <InternalHeader title={h1[0]?.content} />

      <section className="contact-cards my-5">
        <Container>
          <Row className="g-4">
            <Col md={4}>
              <Card className="contact-card text-center h-100">
                <Card.Body>
                  <div className="icon">
                    <FaPhoneAlt />
                  </div>
                  <hr />
                  {h4[0] && <h4>{h4[0].content}</h4>}
                  {p[0] && (
                    <p className="label text-secondary fw-bold">
                      {getText(p[0].content)}
                    </p>
                  )}
                  <p>1-888-740-1896</p>
                  {p[1] && (
                    <p className="label text-secondary fw-bold">
                      {getText(p[1].content)}
                    </p>
                  )}
                  <p>800-248-3779</p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="contact-card text-center h-100">
                <Card.Body>
                  <div className="icon">
                    <FaEnvelope />
                  </div>
                  <hr />
                  {h4[1] && <h4>{h4[1].content}</h4>}
                  {p[2] && (
                    <p className="label text-secondary fw-bold">
                      {getText(p[2].content)}
                    </p>
                  )}
                  <p>cs@bogartcasino.ag</p>
                  {p[3] && (
                    <p className="label text-secondary fw-bold">
                      {getText(p[3].content)}
                    </p>
                  )}
                  <p>documents@bogartcasino.ag</p>
                  {p[4] && (
                    <p className="label text-secondary fw-bold">
                      {getText(p[4].content)}
                    </p>
                  )}
                  <p>affiliates@bogartcasino.ag</p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="contact-card text-center h-100">
                <Card.Body>
                  <div className="icon">
                    <FaCommentDots />
                  </div>
                  <hr />
                  {h4[2] && <h4>{h4[2].content}</h4>}
                  {p[5] && (
                    <p className="label text-secondary fw-bold">
                      {getText(p[5].content)}
                    </p>
                  )}
                  {p[6] && <p>{getText(p[6].content)}</p>}
                  <p>7:00 am - 7:00 pm PST.</p>
                  <p>10:00 am - 11:00 pm EST.</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </Container>
  );
}

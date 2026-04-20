import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import { HiGift } from "react-icons/hi2";
import { useContent } from "../../content/context/content-context";

export default function PromoContent() {
  const { promotions: promos, isBootstrapping: loading, bootstrapError: error } =
    useContent();

  const getPromoButtonText = (terms) => {
    if (!terms) return null;

    const parser = new DOMParser();
    const doc = parser.parseFromString(terms, "text/html");
    return doc.querySelector("p")?.textContent?.trim() || null;
  };

  if (loading) return <div>Loading promotions...</div>;
  if (error) return <div>{error}</div>;
  if (!promos.length) return <div>No promotions available</div>;

  return (
    <>
      <Container className="mt-5">
        <Breadcrumbs />
      </Container>

      <Container className="pt-2 pb-5">
        <h5 className="fw-bold">
          <HiGift className="me-2 mb-2" />
          Promotions
        </h5>

        <Row>
          {promos.map((promo) => (
            <Col
              xs={12}
              md={6}
              lg={6}
              key={promo.id}
              className="mb-4 rounded promotion-wrap"
            >
              <Card className="h-100 shadow">
                {promo.image && (
                  <Card.Img
                    variant="top"
                    src={promo.image[0].url}
                    alt={promo.imageAltText || promo.name}
                  />
                )}

                <Card.Body className="d-flex flex-column flex-lg-row justify-content-between align-items-center">
                  <Card.Title>{promo.name}</Card.Title>
                  <Button
                    as={Link}
                    to={`/promotions/${promo.slug}`}
                    className="btn-yellow"
                  >
                    {getPromoButtonText(promo.terms) ||
                      promo.lear ||
                      promo.learn ||
                      "Learn more"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

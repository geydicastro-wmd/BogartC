import { useEffect, useState } from "react";
import api from "../../api/api";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import { HiGift } from "react-icons/hi2";

export default function PromoContent() {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  const fetchPromos = async () => {
    try {
      setLoading(true);

      const res = await api.get("/promotions", {
        params: {
          brand: "BogartCasino",
          language: "en",
        },
      });

      console.log("PROMOS:", res.data);

      setPromos(res.data || []);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error loading promotions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  if (loading) return <div>Loading promotions...</div>;
  if (error) return <div>{error}</div>;
  if (!promos.length) return <div>No promotions available</div>;

  return (
    <>
    <Container className="mt-5">
                <Breadcrumbs />
              </Container>

    <Container className="pt-2 pb-5">
      <h5 className="fw-bold"><HiGift className="me-2 mb-2" />Promotions</h5>

      <Row>
        {promos.map((promo) => (
          <Col xs={12} md={6} lg={4} key={promo.id} className="mb-4 rounded">
            <Card className="h-100 shadow">
              {promo.image && (
                <Card.Img
                  variant="top"
                  src={promo.image[0].url}
                  alt={promo.imageAltText || promo.name}
                />
              )}

              <Card.Body className="d-inline-flex justify-content-around align-items-center">
                <Card.Title>{promo.name}</Card.Title>
                <Button as={Link} to={`/promotions/${promo.cuponCode}`} className="btn-yellow">
                  Learn more
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

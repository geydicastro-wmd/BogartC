import AppLogin from "../components/AppLogin";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import Loading from "../components/common/loading";
import useCmsPage from "../content/hooks/useCmsPage";

export default function Login() {
  const { page, loading, error, getBlocks, getText } = useCmsPage("Login");

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  if (!page) return <div>No content found</div>;

  const h3 = getBlocks("h3");
  const p = getBlocks("p");

  return (
    <Container fluid className="bg-bogart  pt-5">
      <Container className="text-light pt-5">
        <Row className="text-center justify-content-center">
          {h3[0] && <h3 className="fw-bold my-3">{h3[0].content}</h3>}
          <Col xs={12} md={4}>
            <div className="login-box">
              <AppLogin />
            </div>

            {p[0] && p[1] && (
              <p className="mt-5">
                {getText(p[0].content)}{" "}
                <Link to="/terms" className="terms-link">
                  {getText(p[1].content)}
                </Link>
              </p>
            )}

            <div className="border-top border-white pt-3 fs-5 fw-bold">
              {p[2] && <span className="fw-bold">{getText(p[2].content)}</span>}

              <Button
                className="btn-outline-yellow fw-bold ms-3"
                as={Link}
                to="/register"
              >
                {getText(p[3]?.content)}
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

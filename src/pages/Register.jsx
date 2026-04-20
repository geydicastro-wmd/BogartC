import RegisterForm from "../components/pages/RegisterForm";
import { Helmet } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import Loading from "../components/common/loading";
import useCmsPage from "../content/hooks/useCmsPage";

export default function Register() {
  const { page, translation, loading, error, getBlocks, getText } =
    useCmsPage("Register");

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  if (!page) return <div>No content found</div>;

  const h2 = getBlocks("h2");
  const p = getBlocks("p");

  return (
    <section className="bg-bogart ">
      {translation && (
        <Helmet>
          <title>{translation.meta_title || page.title}</title>
        </Helmet>
      )}

      <div className="py-5 my-5">
        <section className="register-hero mb-3">
          <Container>
            <Row className="justify-content-center text-center">
              {h2[0] && <h2 className="fw-bold mb-1">{h2[0].content}</h2>}
              <Col xs={12} md={6} lg={4}>
                {p[0] && (
                  <p className="text-muted small mb-4">{getText(p[0].content)}</p>
                )}

                <div className="signup-card p-4 rounded-4">
                  <RegisterForm />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </section>
  );
}

import { Container, Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import Loading from "../components/common/loading";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Breadcrumbs from "../components/common/Breadcrumbs";
import InternalHeader from "../components/InternalHeader";
import useCmsPage from "../content/hooks/useCmsPage";

export default function About() {
  const { page, translation, loading, error, getBlocks, renderHtml } =
    useCmsPage("AboutUs");

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  if (!page) return <div>No content found</div>;

  const h1 = getBlocks("h1");
  const divs = getBlocks("div");

  return (
    <>
      {translation && (
        <Helmet>
          <title>{translation.meta_title || page.title}</title>
        </Helmet>
      )}

      <InternalHeader title={h1[0]?.content} />
      <div className="container mt-5">
        <Breadcrumbs />
      </div>

      <Container className="my-3">
        <Row className="justify-content-center">
          <Col lg={12}>
            <div
              className="mb-5"
              dangerouslySetInnerHTML={renderHtml(divs[0]?.content)}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

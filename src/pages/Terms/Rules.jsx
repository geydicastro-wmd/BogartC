import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Loading from "../../components/common/loading";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import InternalHeader from "../../components/InternalHeader";
import useCmsPage from "../../content/hooks/useCmsPage";
import { decodeHtml } from "../../content/utils/content";

function HTMLRenderer({ content, as = "span" }) {
  if (!content) return null;

  const Tag = as;

  return (
    <Tag
      dangerouslySetInnerHTML={{
        __html: decodeHtml(content),
      }}
    />
  );
}

export default function Rules() {
  const { page, translation, loading, error, getBlocks } =
    useCmsPage("GeneralRules");

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  if (!page) return <div>No content found</div>;

  const h2 = getBlocks("h2");
  const p = getBlocks("p");

  const rulesConfig = [
    { slug: "terms-and-conditions", index: 0 },
    { slug: "privacy", index: 1 },
    { slug: "responsible-gaming", index: 2 },
    { slug: "kyc", index: 3 },
    { slug: "aml-policy", index: 4 },
    { slug: "anti-fraud", index: 5 },
    { slug: "bonuses", index: 6 },
    { slug: "deposit", index: 7 },
    { slug: "withdrawal", index: 8 },
    { slug: "lottery-rules", index: 9 },
  ];

  return (
    <>
      {translation && (
        <Helmet>
          <title>{translation.meta_title || page.title}</title>
        </Helmet>
      )}

      <InternalHeader title={decodeHtml(h2[0]?.content)} />

      <div className="container mt-5">
        <Breadcrumbs />
      </div>

      <Container className="my-5">
        <Row xs={1} md={2} className="g-4">
          <Col>
            <Card className="rules-card">
              <Card.Body>
                <ListGroup variant="flush">
                  {rulesConfig.slice(0, 5).map((item) => (
                    <ListGroup.Item
                      as={NavLink}
                      to={`/rules/${item.slug}`}
                      key={item.slug}
                    >
                      <HTMLRenderer content={p[item.index]?.content} />
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card className="rules-card">
              <Card.Body>
                <ListGroup variant="flush">
                  {rulesConfig.slice(5).map((item) => (
                    <ListGroup.Item
                      as={NavLink}
                      to={`/rules/${item.slug}`}
                      key={item.slug}
                    >
                      <HTMLRenderer content={p[item.index]?.content} />
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

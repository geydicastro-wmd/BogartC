import { useParams, Link } from "react-router-dom";
import { Container, Col, Row, Button, Card } from "react-bootstrap";
import { useContent } from "../../content/context/content-context";

export default function PromoDetailContent() {
  const { slug } = useParams();
  const {
    getPromotionBySlug,
    isBootstrapping: loading,
    bootstrapError: error,
  } = useContent();
  const promo = getPromotionBySlug(slug);

  const parseTerms = (html) => {
    if (!html) {
      return {
        sections: [],
        buttonLabels: [],
      };
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const headings = Array.from(doc.querySelectorAll("h6")).map((heading) =>
      heading.textContent?.trim(),
    );

    const getNormalizedListHtml = (list) => {
      let currentList = list;

      while (
        currentList &&
        !currentList.querySelector(":scope > li") &&
        currentList.children.length === 1 &&
        currentList.firstElementChild?.tagName.toLowerCase() === "ul"
      ) {
        currentList = currentList.firstElementChild;
      }

      return currentList?.innerHTML || "";
    };

    const lists = Array.from(doc.querySelectorAll("ul"))
      .filter((list) => list.parentElement?.tagName.toLowerCase() !== "ul")
      .map((list) => getNormalizedListHtml(list));

    const sections = headings.map((title, index) => ({
      title,
      listHtml: lists[index] || "",
    }));

    const buttonLabels = Array.from(doc.querySelectorAll("h5")).map((heading) =>
      heading.textContent?.trim(),
    );

    return {
      sections,
      buttonLabels,
    };
  };

  const { sections, buttonLabels } = parseTerms(promo?.terms);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!promo) return <div>Promo not found</div>;

  return (
    <>

    {/* 
      <Container className=" mt-5">
        <Breadcrumbs />
      </Container>*/}

      <Card className="promo-card shadow-lg mx-lg-auto mx-2 mb-5 mt-2">
        <div className="promo-image-wrapper">
          <Card.Img
            variant="top"
            src={promo.image?.[0]?.url}
            alt={promo.name}
            className="promo-img"
          />

          <div className="promo-overlay">
            <h1 className="promo-title text-warning">{promo.name}</h1>
            <h5>COUPON CODE: {promo.cuponCode}</h5>
          </div>
        </div>

        <Card.Body className="promo-body p-5">
          <Row>
            <Col xs={12} md={6}>
              {sections[0]?.title && <h6 className="fw-bold">{sections[0].title}</h6>}

              {sections[0]?.listHtml && (
                <ul dangerouslySetInnerHTML={{ __html: sections[0].listHtml }} />
              )}
            </Col>

            <Col xs={12} md={6}>
              {sections[1]?.title && <h6 className="fw-bold">{sections[1].title}</h6>}

              {sections[1]?.listHtml && (
                <ul dangerouslySetInnerHTML={{ __html: sections[1].listHtml }} />
              )}
            </Col>
          </Row>

          <div className="promo-buttons">
            <Button className="btn-yellow" as={Link} to={"/login"}>
              {buttonLabels[0] || "Play Now"}
            </Button>
            <Button className="btn-outline-white" as={Link} to={"/register"}>
              {buttonLabels[1] || "Open a Free Account"}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

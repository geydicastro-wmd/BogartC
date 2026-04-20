import { useState } from "react";
import { Container, Row, Col, Collapse, Button, Card } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import Loading from "../components/common/loading";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import InternalHeader from "../components/InternalHeader";
import useCmsPage from "../content/hooks/useCmsPage";
import {
  depositMethods,
  withdrawalMethods,
} from "../components/cashier/bankingData";

export default function Cashier() {
  const [open, setOpen] = useState("deposit");
  const depositLogos = depositMethods.map((item) => item.logo);
  const withdrawalLogos = withdrawalMethods.map((item) => item.logo);
  const { page, translation, loading, error, getBlocks, renderHtml } =
    useCmsPage("Cashier");

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  if (!page) return <div>No content found</div>;

  const h1 = getBlocks("h1");
  const p = getBlocks("p");
  const divs = getBlocks("div");

  return (
    <>
      <InternalHeader title={h1[0]?.content} />
      <Container>
        {translation && (
          <Helmet>
            <title>{translation.meta_title || page.title}</title>
          </Helmet>
        )}

        <Row className="justify-content-center text-center my-3">
          <Col xs={12} className="my-0 my-lg-3">
            <div className="d-inline-flex gap-3">
              <Button
                dangerouslySetInnerHTML={renderHtml(p[0]?.content)}
                className={`btn-yellow ${open === "deposit" ? "active" : ""}`}
                onClick={() => setOpen("deposit")}
              />

              <Button
                dangerouslySetInnerHTML={renderHtml(p[1]?.content)}
                variant="outline-light"
                className={`btn-outline-white ${open === "withdrawal" ? "active" : ""}`}
                onClick={() => setOpen("withdrawal")}
              />
            </div>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12}>
            <Collapse in={open === "deposit"}>
              <Row className="justify-content-center g-3">
                {depositLogos.map((logo, index) => (
                  <Col lg={3} md={6} xs={12} key={`deposit-${index}`}>
                    <Card className="h-100">
                      <Card.Img
                        variant="top"
                        className="p-3 bg-light"
                        src={logo}
                        alt={`deposit-method-${index + 1}`}
                        height={80}
                      />
                      <Card.Body>
                        <div
                          className="banking-card-body"
                          dangerouslySetInnerHTML={renderHtml(divs[index]?.content)}
                        />
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Collapse>

            <Collapse in={open === "withdrawal"}>
              <Row className="justify-content-center g-3">
                {withdrawalLogos.map((logo, index) => (
                  <Col lg={3} md={6} xs={12} key={`withdrawal-${index}`}>
                    <Card className="h-100">
                      <Card.Img
                        variant="top"
                        className="p-3 bg-light"
                        src={logo}
                        alt={`withdrawal-method-${index + 1}`}
                        height={80}
                      />
                      <Card.Body>
                        <div
                          className="banking-card-body"
                          dangerouslySetInnerHTML={renderHtml(
                            divs[index + depositLogos.length]?.content,
                          )}
                        />
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Collapse>
          </Col>
        </Row>
      </Container>
    </>
  );
}

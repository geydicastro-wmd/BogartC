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

  const { page, translation, loading, error, getBlocks, renderHtml } =
    useCmsPage("Cashier");

  const lang = translation?.language || "en";
  const normalizedLang = lang.toLowerCase();

  const getMethodDivIndex = (method, fallbackIndex) => {
    if (typeof method.apiDivNumber === "number") return method.apiDivNumber - 1;
    if (
      method.apiDivNumber &&
      method.apiDivNumber[normalizedLang] !== undefined
    ) {
      return method.apiDivNumber[normalizedLang] - 1;
    }
    return fallbackIndex;
  };

  // 🔥 Filtrar depósitos por idioma
  const filteredDeposits = depositMethods.filter((method) => {
    if (!method.languages) return true;
    return method.languages.includes(normalizedLang);
  });

  // withdrawals normalmente no cambian
  const filteredWithdrawals = withdrawalMethods;

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
                {filteredDeposits.map((method, index) => (
                  <Col lg={3} md={6} xs={12} key={`deposit-${index}`}>
                    <Card className="h-100">
                      
                      <div className="card-img-top custom-logo-container">
                        {Array.isArray(method.logo) ? (
                          method.logo.map((img, i) => (
                            <img
                              key={i}
                              src={img}
                              className="logo-multi"
                              alt={`${method.title || "deposit-method"}-${i + 1}`}
                            />
                          ))
                        ) : (
                          <img
                            src={method.logo}
                            className="logo-single"
                            alt={method.title || `deposit-method-${index + 1}`}
                          />
                        )}
                      </div>
                      <Card.Body>
                        <div
                          className="banking-card-body"
                          dangerouslySetInnerHTML={renderHtml(
                            divs[getMethodDivIndex(method, index)]?.content
                          )}
                        />
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Collapse>

            <Collapse in={open === "withdrawal"}>
              <Row className="justify-content-center g-3">
                 {filteredWithdrawals.map((method, index) => (
                  <Col lg={3} md={6} xs={12} key={`withdrawal-${index}`}>
                    <Card className="h-100">
                      <Card.Img
                        variant="top"
                        className="p-3 bg-light"
                         src={method.logo}
                        alt={`withdrawal-method-${index + 1}`}
                        height={80}
                      />
                       <Card.Body>
                        <div
                          className="banking-card-body"
                          dangerouslySetInnerHTML={renderHtml(
                            divs[index + filteredDeposits.length]?.content
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

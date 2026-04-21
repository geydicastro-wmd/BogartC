import HeroSlider from "../components/HeroSlider";
import GameOfWeekModal from "../components/ModalGame";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import Loading from "../components/common/loading";
import useCmsPage from "../content/hooks/useCmsPage";
import CasinoContent from "../components/pages/CasinoContent";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Home() {
  const [activeCollapse, setActiveCollapse] = useState(null);
  const { page, translation, loading, error, getBlocks, renderHtml } =
    useCmsPage("home");

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  if (!page) return <div>No content found</div>;

  const h2 = getBlocks("h2");
  const h3 = getBlocks("h3");
  const p = getBlocks("p");
  const divs = getBlocks("div");

  return (
    <>
      {translation && (
        <Helmet>
          <title>{translation.meta_title}</title>
          <link rel="canonical" href={translation.canonical_url} />
          <meta name="description" content={translation.meta_description} />
          <meta property="og:title" content={translation.og_title} />
          <meta
            property="og:description"
            content={translation.og_description}
          />
          {translation.og_image && (
            <meta property="og:image" content={translation.og_image} />
          )}
          <meta name="twitter:title" content={translation.twitter_title} />
          <meta
            name="twitter:description"
            content={translation.twitter_description}
          />
          {translation.twitter_image && (
            <meta name="twitter:image" content={translation.twitter_image} />
          )}
          <meta name="robots" content={translation.robots} />
        </Helmet>
      )}

      <HeroSlider />

      <GameOfWeekModal />

      <Row className="m-0">
        <CasinoContent />

        {/* <div className="sidebar">
          <div>
            <button className="close-btn">×</button>
          </div>
          <div id="jgator_menu">&nbsp;</div>
        </div>

        <div className="main-content">
          <div className="menu-toggle-wrap position-sticky z-1 float-start">
            <button className="menu-toggle rounded-2 border-0 bg-dark text-white">
              ☰
            </button>
          </div>

          <div id="jgator_main">&nbsp;</div>  */}

        <section className="container-fluid pt-3 pt-lg-5 border-top border-dark">
          <div className="container__bogart-general">
            <Row>
              <Col className="text-center">
                {h2[0] && <h2>{h2[0].content}</h2>}
                {h3[0] && <h3>{h3[0].content}</h3>}
                {p[0] && (
                  <p dangerouslySetInnerHTML={renderHtml(p[0].content)} />
                )}
                {p[1] && (
                  <p dangerouslySetInnerHTML={renderHtml(p[1].content)} />
                )}
              </Col>
            </Row>

            <Row className="mt-5">
              <Col className="d-flex justify-content-center mb-3">
                <div className="d-inline-flex gap-3">
                  <button
                    className="btn btn-yellow"
                    onClick={() =>
                      setActiveCollapse(
                        activeCollapse === "deposit" ? null : "deposit",
                      )
                    }
                    dangerouslySetInnerHTML={renderHtml(p[2]?.content)}
                  />
                  <button
                    className="btn btn-outline-white"
                    onClick={() =>
                      setActiveCollapse(
                        activeCollapse === "withdrawal" ? null : "withdrawal",
                      )
                    }
                    dangerouslySetInnerHTML={renderHtml(p[3]?.content)}
                  />
                </div>
              </Col>
            </Row>

            <Row className="mb-5">
              <Col>
                <div id="collapseContainer">
                  <div
                    className={`collapse ${activeCollapse === "deposit" ? "show" : ""}`}
                  >
                    <Row className="justify-content-center g-3">
                      <Col lg={6}>
                        {divs[0] && (
                          <div
                            dangerouslySetInnerHTML={renderHtml(
                              divs[0].content,
                            )}
                          />
                        )}
                      </Col>
                    </Row>
                  </div>

                  <div
                    className={`collapse ${activeCollapse === "withdrawal" ? "show" : ""}`}
                  >
                    <Row className="justify-content-center g-3">
                      <Col lg={6}>
                        {divs[1] && (
                          <div
                            className="fs-6 text-light"
                            dangerouslySetInnerHTML={renderHtml(
                              divs[1].content,
                            )}
                          />
                        )}
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </section>
      </Row>
    </>
  );
}

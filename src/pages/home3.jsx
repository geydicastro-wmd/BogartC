import HeroSlider from "../components/HeroSlider3";
import HomeContent from "../components/pages/HomeContent";
import GameOfWeekModal from "../components/ModalGame";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import Loading from "../components/loading";
import api from "../api/api";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Home() {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeCollapse, setActiveCollapse] = useState(null);

  const language = "en";

  const fetchContent = async () => {
    try {
      setLoading(true);

      const res = await api.get("/content-page/admin", {
        params: {
          brand_id: 3,
          page_type: "home",
        },
      });
      console.log("API RESPONSE:", res.data);
      setPage(res.data.items?.[0] || null);
    } catch (err) {
      setError(err.response?.data?.message || "Error loading content");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  if (loading) return <Loading />;

  if (error) return <div>Error: {error}</div>;

  if (!page) return <div>No content found</div>;

  const translation = page.translations?.find((t) => t.language === language);

  const blocks = translation?.content || [];

  const getBlocks = (type) => blocks.filter((b) => b.type === type);

  const renderHTML = (html) => ({
    __html: html || "",
  });

  // Bloques
  //const h1 = getBlock("h1");
  const h2 = getBlocks("h2");
  const h3 = getBlocks("h3");
  // const h4 = getBlocks("h4");
  // const h5 = getBlocks("h5");
  // const h6 = getBlocks("h6");
  // const ol = getBlocks("ol");
  // const ul = getBlocks("ul");
  const p = getBlocks("p");
  const divs = getBlocks("div");

  return (
    <>
      {/* SEO */}
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
        {/* Sidebar */}
        <div className="sidebar">
          <div>
            <button className="close-btn">×</button>
          </div>
          <div id="jgator_menu">&nbsp;</div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Toggle */}
          <div className="menu-toggle-wrap position-sticky z-1 float-start">
            <button className="menu-toggle rounded-2 border-0 bg-dark text-white">
              ☰
            </button>
          </div>

          {/* Juegos */}
          <div id="jgator_main">&nbsp;</div>

          {/* Closing Section */}
          <section className="container-fluid pt-3 pt-lg-5 border-top border-dark">
            <div className="container__bogart-general">
              <Row>
                <Col className="text-center">
                  {h2[0] && <h2>{h2[0].content}</h2>}

                  {h3[0] && <h3>{h3[0].content}</h3>}

                  {p[0] && (
                    <p dangerouslySetInnerHTML={renderHTML(p[0].content)} />
                  )}
                  {p[1] && (
                    <p dangerouslySetInnerHTML={renderHTML(p[1].content)} />
                  )}
                </Col>
              </Row>

              {/* Buttons */}
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
                      dangerouslySetInnerHTML={renderHTML(p[2]?.content)}
                    />

                    <button
                      className="btn btn-outline-white"
                      onClick={() =>
                        setActiveCollapse(
                          activeCollapse === "withdrawal" ? null : "withdrawal",
                        )
                      }
                      dangerouslySetInnerHTML={renderHTML(p[3]?.content)}
                    />
                  </div>
                </Col>
              </Row>

              {/* Collapses */}
              <Row className="mb-5">
                <Col>
                  <div id="collapseContainer">
                    {/* Deposit */}
                    <div
                      className={`collapse ${activeCollapse === "deposit" ? "show" : ""}`}
                    >
                      <Row className="justify-content-center g-3">
                        <Col lg={6}>
                          {divs[0] && (
                            <div
                              dangerouslySetInnerHTML={renderHTML(
                                divs[0].content,
                              )}
                            />
                          )}
                        </Col>
                      </Row>
                    </div>

                    {/* Withdrawal */}
                    <div
                      className={`collapse ${activeCollapse === "withdrawal" ? "show" : ""}`}
                    >
                      <Row className="justify-content-center g-3">
                        <Col lg={6}>
                          {divs[1] && (
                            <div
                              className="fs-6 text-light"
                              dangerouslySetInnerHTML={renderHTML(
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
        </div>
      </Row>
    </>
  );
}

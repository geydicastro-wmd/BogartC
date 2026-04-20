import { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Collapse
} from "react-bootstrap";

export default function HomeContent() {

  useEffect(() => {
    // CSS externos
    const link1 = document.createElement("link");
    link1.rel = "stylesheet";
    link1.href = "https://cdn.jokergator.com/css/style-games.css?v=3-19";

    const link2 = document.createElement("link");
    link2.rel = "stylesheet";
    link2.href = "https://cdn.jokergator.com/css/style-bc.css?v=12-27";

    document.head.appendChild(link1);
    document.head.appendChild(link2);

    // Script principal
    const mainScript = document.createElement("script");
    mainScript.src = "https://inc.jokergator.com/assets/scripts/main.js";
    mainScript.async = true;
    document.body.appendChild(mainScript);

    // Script dinámico
    const script = document.createElement("script");
    script.src =
      "https://inc.jokergator.com/js/jgator.js?t=07d1c655-f6ea-437e-9f02-7bb223f3f054&refresh=" +
      Date.now();

    script.onload = () => {
      if (window.jgatorDef) {
        const jgoptions = {
          play: function () {
            const modalElement = document.getElementById("SigninModal");
            if (modalElement && window.bootstrap) {
              const modal = new window.bootstrap.Modal(modalElement);
              modal.show();
            }
          }
        };

        window.JGator.init(
          window.jgatorDef,
          jgoptions,
          "#jgator_menu",
          "#jgator_main"
        );
      } else {
        console.error("jgatorDef is undefined after script load.");
      }
    };

    document.head.appendChild(script);

    // Cleanup (opcional)
    return () => {
      document.head.removeChild(link1);
      document.head.removeChild(link2);
      document.head.removeChild(script);
      document.body.removeChild(mainScript);
    };
  }, []);

  return (
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
                <h1>Welcome to Bogart Casino — Play Slots, Table Games & Live Casino</h1>
                <h2>Claim Big Casino Bonuses and Start Winning Today</h2>
                <h3>Enjoy 1,000+ Games Including Slots, Live Dealers, and More</h3>

                <p>
                  Experience the excitement of uniquely-themed games at Bogart Casino Online,
                  featuring Cards, Roulette, Slots, Poker, and more.
                </p>

                <p>
                  Join us today and dive into a world of fun and fantastic prizes.
                </p>
              </Col>
            </Row>

            {/* Buttons */}
            <Row className="mt-5">
              <Col className="d-flex justify-content-center mb-3">
                <div className="d-inline-flex gap-3">
                  <Button
                    className="btn-yellow "
                    data-bs-toggle="collapse"
                    href="#collapseDepositMethods"
                  >
                    How to Start?
                  </Button>

                  <Button
                    className="btn-outline-white"
                    data-bs-toggle="collapse"
                    href="#collapseWithdrawalMethods"
                  >
                    How to Play?
                  </Button>
                </div>
              </Col>
            </Row>

            {/* Collapses */}
            <Row className="mb-5">
              <Col>
                <div id="collapseContainer">

                  {/* Start */}
                  <div className="collapse" id="collapseDepositMethods">
                    <Row className="justify-content-center g-3">
                      <Col lg={8}>
                        <details>
                          <summary className="my-3">
                            <strong>1. Sign Up & Verify</strong>
                          </summary>
                          <ol>
                            <li>Click on "Sign Up."</li>
                            <li>Enter your details.</li>
                            <li>Check email for code.</li>
                            <li>Activate account.</li>
                          </ol>
                        </details>

                        <details>
                          <summary className="my-3">
                            <strong>2. Deposit & Claim Bonus</strong>
                          </summary>
                          <ol>
                            <li>Go to cashier.</li>
                            <li>Deposit funds.</li>
                            <li>Contact support for bonus.</li>
                          </ol>
                        </details>

                        <details>
                          <summary className="my-3">
                            <strong>3. Start Playing</strong>
                          </summary>
                          <ol>
                            <li>Explore games.</li>
                            <li>Play real or demo.</li>
                          </ol>
                        </details>
                      </Col>
                    </Row>
                  </div>

                  {/* Play */}
                  <div className="collapse" id="collapseWithdrawalMethods">
                    <Row className="justify-content-center g-3">
                      <Col lg={8}>
                        <details>
                          <summary className="my-3">
                            <strong>1. Choose a Game</strong>
                          </summary>
                          <p>Select from slots, tables, or live dealer.</p>
                        </details>

                        <details>
                          <summary className="my-3">
                            <strong>2. Place Your Bet</strong>
                          </summary>
                          <p>Adjust your wager and paylines.</p>
                        </details>

                        <details>
                          <summary className="my-3">
                            <strong>3. Spin or Deal</strong>
                          </summary>
                          <ul>
                            <li>Click spin or deal.</li>
                            <li>Watch results.</li>
                          </ul>
                        </details>

                        <details>
                          <summary className="my-3">
                            <strong>4. Enjoy</strong>
                          </summary>
                          <p>Play responsibly and have fun.</p>
                        </details>
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
  );
}
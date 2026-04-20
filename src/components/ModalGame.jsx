import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import logoBogart from "../assets/logoBogart.svg";
import SigninModal from "./ModalLogin";
import { useContent } from "../content/context/content-context";
import { pickTranslation, renderHtml } from "../content/utils/content";

export default function GameOfWeekModal() {
  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const {
    gameOfWeek: game,
    lang,
    isBootstrapping: loading,
    bootstrapError: error,
  } = useContent();

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem("gameOfWeekSeen");

    if (!alreadySeen) {
      setShow(true);
      sessionStorage.setItem("gameOfWeekSeen", "true");
    }
  }, []);

  const translation = pickTranslation(game, lang);
  const videoUrl = game?.video?.[0]?.url || "";

  const descriptionBlocks = Array.isArray(translation?.description)
    ? translation.description
    : Array.isArray(game?.description)
      ? game.description
      : [];

  const richTextContent =
    typeof translation?.content === "string"
      ? translation.content
      : typeof game?.content === "string"
        ? game.content
        : typeof translation?.description === "string"
          ? translation.description
          : typeof game?.description === "string"
            ? game.description
            : "";

  const p = descriptionBlocks.filter((block) => block.type === "p");

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        contentClassName="bg-black text-white position-relative"
      >
        <Modal.Header className="border-0 position-relative">
          <img
            className="img-fluid position-absolute top-0 start-50 translate-middle"
            src={logoBogart}
            alt="logo"
            width="165"
          />

          <Button
            variant="dark"
            onClick={() => setShow(false)}
            className="rounded-circle border border-white position-absolute top-0 start-100 translate-middle"
          >
            Ã—
          </Button>
        </Modal.Header>

        <Modal.Body className="text-center mt-5 px-3 px-lg-5">
          <div className="ribbon-wrap mt-3">
            <div className="ribbon">
              <span className="fs-5">GAME OF THE WEEK</span>
            </div>

            <div className="ribbon-sub fs-5">
              <span>
                <strong className="bonus">200%</strong> Welcome Bonus
              </span>
              <span className="code">
                Coupon Code: <strong>BOGART200</strong>
              </span>
            </div>
          </div>

          {loading && <p className="mt-3 mb-0">Loading...</p>}

          <div className="d-inline-flex">
            {videoUrl && (
              <video
                className="w-100 rounded-3"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={videoUrl} type="video/mp4" />
              </video>
            )}
          </div>

          {!loading && p[0]?.content && (
            <p
              className="mt-3 mb-0"
              dangerouslySetInnerHTML={renderHtml(p[0].content)}
            />
          )}

          {!loading && !p[0]?.content && richTextContent && (
            <div
              className="mt-3 mb-0"
              dangerouslySetInnerHTML={renderHtml(richTextContent)}
            />
          )}

          {!loading && error && <p className="mt-3 mb-0 text-danger">{error}</p>}

          <div className="mt-3">
            <Button
              onClick={() => {
                setShow(false);
                setShowLogin(true);
              }}
              className="btn-yellow"
            >
              PLAY NOW
            </Button>
          </div>
        </Modal.Body>

        <div className="border-top d-flex justify-content-center align-items-center py-3">
          <p className="me-5 mb-0">New to Bogart Casino?</p>
          <a href="/register" className="btn btn-outline-yellow btn-sm">
            JOIN NOW
          </a>
        </div>
      </Modal>

      <SigninModal show={showLogin} handleClose={() => setShowLogin(false)} />
    </>
  );
}

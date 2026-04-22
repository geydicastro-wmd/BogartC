import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import logoBogart from "../assets/logoBogart.svg";
import SigninModal from "./ModalLogin";
import { useCmsGameOfWeek } from "../content/hooks/useCmsGameOfWeek";
import { renderHtml } from "../content/utils/content";

export default function GameOfWeekModal() {
  const { item, loading, error, getBlocks, getText } = useCmsGameOfWeek();
  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const videoUrl = item?.video?.[0]?.url || "";
  const p = getBlocks("p");

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem("gameOfWeekSeen");

    if (!alreadySeen) {
      setShow(true);
      sessionStorage.setItem("gameOfWeekSeen", "true");
    }
  }, []);

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
            x
          </Button>
        </Modal.Header>

        <Modal.Body className="text-center mt-5 px-3 px-lg-5">
          <div className="ribbon-wrap mt-3">
            <div className="ribbon">
              {p[0] && <span className="fw-bold ">{getText(p[0].content)}</span>}
            </div>

            <div className="ribbon-sub fs-5">
              {p[1] && <span className="small" dangerouslySetInnerHTML={renderHtml(p[1].content)} />}
              {p[2] && (
                <span
                  className="code small text-warning ms-3"
                  dangerouslySetInnerHTML={renderHtml(p[2].content)}
                />
              )}
            </div>
          </div>

          {loading && <p className="mt-3 mb-0">Loading...</p>}
          {error && <p className="mt-3 mb-0">Unable to load the game of the week.</p>}

          <div className="d-inline-flex">
            {videoUrl && (
              <video className="w-100 rounded-3" autoPlay loop muted playsInline>
                <source src={videoUrl} type="video/mp4" />
              </video>
            )}
          </div>

          <div className="mt-3">
            <Button
              onClick={() => {
                setShow(false);
                setShowLogin(true);
              }}
              className="btn-yellow"
            >
              {getText(p[3]?.content) || "PLAY NOW"}
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

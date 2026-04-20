import { Modal, Button } from "react-bootstrap";
import AppLogin from "./AppLogin";
import { IoClose } from "react-icons/io5";
import logoBogart from "../assets/logoBogart.svg"

export default function SigninModal({ show, handleClose }) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      contentClassName="bg-black text-white position-relative"
    >
      {/* HEADER */}
      <Modal.Header className="border-0 position-relative">
        <div className="w-100 text-center position-absolute top-0 start-50 translate-middle">
          <img
            className="img-fluid"
            src={logoBogart}
            alt="logo"
            width="165"
            height="165"
          />
        </div>

        <Button
          variant="dark"
          onClick={handleClose}
          className="rounded-circle border border-white position-absolute top-0 start-100 translate-middle"
        >
         <IoClose />
        </Button>
      </Modal.Header>

      {/* BODY */}
      <Modal.Body className="text-center mt-5">
        <div className="mx-auto">
          <AppLogin />
        </div>
      </Modal.Body>

      {/* FOOTER */}
      <Modal.Footer className="border-0 justify-content-center text-muted">
        <p className="small">
          By continuing, you agree to our{" "}
          <a
            className="text-decoration-none text-warning"
            href="/terms-and-conditions"
          >
            Terms of Service
          </a>
        </p>
      </Modal.Footer>

      {/* EXTRA */}
      <div className="border-top d-flex justify-content-center align-items-center py-3">
        <p className="me-5 mb-0">New to Bogart Casino?</p>
        <a
          className="btn-outline-yellow"
          style={{ fontSize: "0.8rem" }}
          href="/register"
        >
          JOIN NOW
        </a>
      </div>
    </Modal>
  );
}
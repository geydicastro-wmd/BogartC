import { useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Collapse
} from "react-bootstrap";

export default function CasinoPage() {


useEffect(() => {
  console.log("JGator:", window.JGator);

  if (window.JGator && window.jgatorDef) {
    window.JGator.init(
      window.jgatorDef,
      {},
      "#jgator_menu",
      "#jgator_main"
    );
  }
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
      </div>
    </Row>
  );
}
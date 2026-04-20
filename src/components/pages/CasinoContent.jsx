import { useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Collapse
} from "react-bootstrap";

export default function CasinoPage() {
 
  const initialized = useRef(false);

useEffect(() => {

  if (initialized.current) return;
    initialized.current = true;

  const loadScripts = async () => {
    // CSS
    const link1 = document.createElement("link");
    link1.rel = "stylesheet";
    link1.href = "https://cdn.jokergator.com/css/style-games.css?v=4-15.1";

    const link2 = document.createElement("link");
    link2.rel = "stylesheet";
    link2.href = "https://cdn.jokergator.com/css/style-bc.css?v=12-27";

    document.head.appendChild(link1);
    document.head.appendChild(link2);

    // ✅ jQuery (REQUIRED)
    const jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-3.6.0.min.js";
    await new Promise((res) => {
      jquery.onload = res;
      document.body.appendChild(jquery);
    });

    // ✅ main.js FIRST
    const mainScript = document.createElement("script");
    mainScript.src = "https://inc.jokergator.com/assets/scripts/main.js";

    await new Promise((res) => {
      mainScript.onload = res;
      document.body.appendChild(mainScript);
    });

    // ✅ jgator.js SECOND (with refresh)
    if (!document.querySelector('script[src*="jgator.js"]')) {
  const jgatorScript = document.createElement("script");
  jgatorScript.src =
    "https://inc.jokergator.com/js/jgator.js?t=07d1c655-f6ea-437e-9f02-7bb223f3f054&refresh=" +
    Date.now();

  await new Promise((res) => {
    jgatorScript.onload = res;
    document.head.appendChild(jgatorScript);
  });
}

    // ✅ INIT AFTER EVERYTHING IS READY
    if (window.jgatorDef && window.JGator) {
      const jgoptions = {
        play: function () {
          const modalElement = document.getElementById("SigninModal");
          if (modalElement && window.bootstrap) {
            const modal = new window.bootstrap.Modal(modalElement);
            modal.show();
          }
        },
      };

      window.JGator.init(
        window.jgatorDef,
        jgoptions,
        "#jgator_menu",
        "#jgator_main"
      );
    } else {
      console.error("JGator or jgatorDef missing");
    }

    // Optional: fix search input
    setTimeout(() => {
      if (window.$) {
        const $input = window.$("input.gameSearch");
        $input.blur();
        $input.toggle();
      }
    }, 1000);
  };

  loadScripts();
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
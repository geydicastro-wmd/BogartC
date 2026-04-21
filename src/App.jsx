import { lazy, Suspense } from "react";
import { Container, Offcanvas } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import ScrollToTopButton from "./components/common/ScrollToTopButton.jsx";
import TawkTo from "./components/common/TawkTo.jsx";
import GTMNoScript from "./integrations/GTM.jsx";

// Lazy components
const Header = lazy(() => import("./components/layout/Header.jsx"));
const Footer = lazy(() => import("./components/layout/Footer.jsx"));

function App() {
  return (
    <>
      <Container fluid className="p-0">
        <Header />

        <main>
          <GTMNoScript />
          <TawkTo />
          <Outlet />
        </main>

        <Footer />
      </Container>

      <ScrollToTopButton />
    </>
  );
}
export default App;



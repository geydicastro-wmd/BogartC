import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

// Brazil
import pix from "../assets/banking/brazil/pix.svg";

// Mexico 
import sevenEleven from "../assets/banking/mexico/7-Eleven.svg";
import bbva from "../assets/banking/mexico/BBVA.svg";
import mix from "../assets/banking/mexico/724-Mix.svg";
import abarrey from "../assets/banking/mexico/Abarrey.svg";
import afirme from "../assets/banking/mexico/Afirme.svg";
import alianza from "../assets/banking/mexico/Alianza.jpg";
import banorte from "../assets/banking/mexico/Banorte.svg";
import bodegaAurrera from "../assets/banking/mexico/Bodega_Aurrera.svg";
import cajaOblatos from "../assets/banking/mexico/Caja-Oblatos.svg";
import calimax from "../assets/banking/mexico/Calimax.svg";
import cityClub from "../assets/banking/mexico/City-Club.svg";
import ck from "../assets/banking/mexico/CK.svg";
import extra from "../assets/banking/mexico/Extra.svg";
import farmaciasRoma from "../assets/banking/mexico/Farmacias-Roma.svg";
import farmaciasDelAhorro from "../assets/banking/mexico/FarmaciasDelAhorro.svg";
import kiosko from "../assets/banking/mexico/Kiosko.svg";
import samsClub from "../assets/banking/mexico/Sam_s-Club.svg";
import santander from "../assets/banking/mexico/Santander.svg";
import soriana from "../assets/banking/mexico/Soriana.svg";
import systienda from "../assets/banking/mexico/SYStienda.svg";
import tiendasNeto from "../assets/banking/mexico/Tiendas-Neto.svg";
import via from "../assets/banking/mexico/Via.svg";
import finabienantestelecom from "../assets/banking/mexico/Finabien-Antes-Telecom.svg";
import walmart from "../assets/banking/mexico/Walmart.svg";
import walmartExpress from "../assets/banking/mexico/walmart_express.svg";
import farmaciayza from "../assets/banking/mexico/farmacia-yza.svg";

export default function BankingMethods() {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const getGeo = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        setCountry(data.country_code);
      } catch (err) {
        console.error("Geo error:", err);
      }
    };

    getGeo();
  }, []);

  const showMX = ["MX", "CR"].includes(country);
  const showBR = ["BR", "CR"].includes(country);

  return (
    <>
      {/* 🇲🇽 Mexico / CR */}
      {showMX && (
        <div className="py-3">
          <Container className="icon-methods">
            <Row className="align-items-center justify-content-center gap-2">
              
              <Col xs="auto">
                <img src={sevenEleven} alt="7-Eleven" width={30} />
              </Col>

              <Col xs="auto">
                <img src={bbva} alt="BBVA" width={50} />
              </Col>

              <Col xs="auto">
                <img src={mix} alt="724-Mix" width={50} />
              </Col>

              <Col xs="auto">
                <img src={abarrey} alt="Abarrey" width={60} />
              </Col>

              <Col xs="auto">
                <img src={afirme} alt="Afirme" width={80} />
              </Col>

              <Col xs="auto">
                <img src={alianza} alt="Alianza" width={80} />
              </Col>

              <Col xs="auto">
                <img src={banorte} alt="Banorte" width={80} />
              </Col>

              <Col xs="auto">
                <img src={bodegaAurrera} alt="Bodega Aurrera" width={80} />
              </Col>

              <Col xs="auto">
                <img src={cajaOblatos} alt="Caja Oblatos" width={80} />
              </Col>

              <Col xs="auto">
                <img src={calimax} alt="Calimax" width={70} />
              </Col>

              <Col xs="auto">
                <img src={cityClub} alt="City Club" width={50} />
              </Col>

              <Col xs="auto">
                <img src={ck} alt="CK" width={60} />
              </Col>

              <Col xs="auto">
                <img src={extra} alt="Extra" width={70} />
              </Col>

              <Col xs="auto">
                <img src={farmaciasRoma} alt="Farmacias Roma" width={50} />
              </Col>

              <Col xs="auto">
                <img src={farmaciasDelAhorro} alt="Farmacias Del Ahorro" width={60} />
              </Col>

              <Col xs="auto">
                <img src={kiosko} alt="Kiosko" width={70} />
              </Col>

              <Col xs="auto">
                <img src={samsClub} alt="Sams Club" width={80} />
              </Col>

              <Col xs="auto">
                <img src={santander} alt="Santander" width={80} />
              </Col>

              <Col xs="auto">
                <img src={soriana} alt="Soriana" width={70} />
              </Col>

              <Col xs="auto">
                <img src={systienda} alt="SYS tienda" width={70} />
              </Col>

              <Col xs="auto">
                <img src={tiendasNeto} alt="Tiendas Neto" width={60} />
              </Col>

              <Col xs="auto">
                <img src={via} alt="Via" width={40} />
              </Col>

              <Col xs="auto">
                <img src={finabienantestelecom} alt="Finabien antes Telecom" width={100} />
              </Col>

              <Col xs="auto">
                <img src={walmart} alt="Walmart" width={70} />
              </Col>

              <Col xs="auto">
                <img src={walmartExpress} alt="Walmart Express" width={70} />
              </Col>

              <Col xs="auto">
                <img src={farmaciayza} alt="Farmacia YZA" width={70} />
              </Col>

            </Row>
          </Container>
        </div>
      )}

      {/* 🇧🇷 Brazil / CR */}
      {showBR && (
        <div className="pb-5">
          <Container className="icon-methods">
            <Row className="align-items-center justify-content-center">
              <Col xs="auto">
                <img src={pix} alt="PIX" width={80} />
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
}
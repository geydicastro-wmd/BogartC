import {
  Container,
  Row,
  Col,
  Button,
  Collapse,
  Card,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import BankingCard from "./BankingCard";
import { depositMethods, withdrawalMethods } from "./bankingData";

export default function BankingMethods() {
  const [open, setOpen] = useState("deposit");

  return (
    <Container>
      <div className="my-3">
        {/* Buttons */}
        <Row className="justify-content-center text-center">
          <Col xs={12} className="my-0 my-lg-3">
            <div className="d-inline-flex gap-3">
              <Button
                className={`btn-yellow ${open === "deposit" ? "active" : ""}`}
                onClick={() => setOpen("deposit")}
              >
                Deposit Methods
              </Button>

              <Button
                variant="outline-light"
                className={`btn-outline-white  ${open === "withdrawal" ? "active" : ""}`}
                onClick={() => setOpen("withdrawal")}
              >
                Withdrawal Methods
              </Button>
            </div>
          </Col>
        </Row>

        {/* Content */}
        <Row>
          <Col xs={12}>
            {/* DEPOSIT */}
            <Collapse in={open === "deposit"}>
              <div>
                <Row className="justify-content-center g-3">
                  {depositMethods.map((item, index) => (
                    <Col key={index} lg={3} md={6} xs={12}>
                      <BankingCard {...item} />
                    </Col>
                  ))}
                </Row>
              </div>
            </Collapse>

            {/* WITHDRAWAL */}
            <Collapse in={open === "withdrawal"}>
              <div>
                <Row className="justify-content-center g-3">
                  {withdrawalMethods.map((item, index) => (
                    <Col key={index} lg={3} md={6} xs={12}>
                      <BankingCard {...item} />
                    </Col>
                  ))}
                </Row>
              </div>
            </Collapse>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

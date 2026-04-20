import { Card, Image } from "react-bootstrap";

export default function BankingCard({
  logo,
  title,
  info,
  min,
  max,
  extra,
  description,
  bullets,
  phone,
}) {
  return (
    <Card className="h-100 d-flex flex-wrap align-content-between">

      <Card.Img variant="top" className="p-3 bg-light" src={logo} height={80} />
      
      <Card.Body className="d-flex flex-column">

        {/* Title */}
        {title && (
          <p>
            <strong>{title}</strong>
          </p>
        )}

        {/* Title */}
        {info && <p style={{ whiteSpace: "pre-line" }}>{info}</p>}

        {/* Limits */}
        {(min || max) && (
          <div className="text-center col-10 mx-auto my-auto">
            {min && (
              <div className="border-bottom border-dark mb-3">
                <p className="fw-bold fs-6 mb-1">• Min:</p>
                <p className="fw-bold fs-4">{min}</p>
              </div>
            )}

            {max && (
              <div>
                <p className="fw-bold fs-6 mb-1">• Max per transfer:</p>
                <p className="fw-bold fs-4">{max}</p>
              </div>
            )}

            {extra && <p className="fw-bold fs-4">{extra}</p>}
          </div>
        )}

        {/* Bullets */}

        {bullets && (
          <ul className="text-start col-10 mx-auto my-3 small text-muted">
            {bullets.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}

        {/* Description */}
        {description && (
          <div className="text-center col-10 mx-auto my-auto">
            <p style={{ whiteSpace: "pre-line" }}>{description}</p>
          </div>
        )}

        {/* Phone */}
        {phone && (
          <div className="text-center mt-auto text-muted">
            <p className="fw-bold fs-3">{phone}</p>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

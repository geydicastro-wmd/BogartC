import { Container, Row, Col, Table, Image } from "react-bootstrap";

export default function LotteryTable({
  image,
  note,
  data
}) {
  return (
    <section className="my-5">
      <Container className="lottery-table-section">
        <Row className="align-items-center justify-content-center">

          {/* LEFT IMAGE */}
          <Col lg={4} xs={12} className="lottery-image text-center">
            <Image src={image} fluid className="lottery-img" />
            <p className="lottery-note">{note}</p>
          </Col>

          {/* RIGHT TABLE */}
          <Col lg={8} xs={12} className="p-0">
            <div className="table-wrapper">
              <Table striped responsive className="lottery-table">
                <thead>
                  <tr>
                    <th>Bet Type</th>
                    <th>Example Ticket</th>
                    <th>Example Result</th>
                    <th>Prize per $1 Bet</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, i) => (
                    <tr key={i}>
                      <td dangerouslySetInnerHTML={{ __html: row.bet }} />
                      <td>{row.ticket}</td>
                      <td>{row.result}</td>
                      <td>{row.prize}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>

        </Row>
      </Container>
    </section>
  );
}
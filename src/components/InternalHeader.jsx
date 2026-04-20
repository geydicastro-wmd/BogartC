import { Container } from "react-bootstrap"
import headerBg from "../assets/Skin/InternalHeader.png"

export default function InternalHeader({ title }) {
  return (
    <Container className="internal-header-wrapper mt-5">
      <div
        className="internal-header"
        style={{ backgroundImage: `url(${headerBg})` }}
      >
        <h1>{title}</h1>
      </div>
    </Container>
  )
}
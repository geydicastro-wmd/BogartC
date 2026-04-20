import logo from '../../assets/logo/logo.png';
import { Container } from 'react-bootstrap';

function Loading() {
    return (
        <Container className="d-flex align-items-center justify-content-center vh-100">
            <img src={logo} className='w-50'></img>
        </Container>
    )
}

export default Loading;
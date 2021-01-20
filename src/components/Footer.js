import { Col, Container, Row } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer>
      <Container>
        <Row>
          <Col align="center">
            <p>Utvecklat av: <a href="https://github.com/ECarlsson/" target="_blank" rel="noreferrer">Eric Carlsson</a></p>
            <p>&copy; {new Date().getFullYear()} Fysikteknologsektionen</p>
          </Col>          
        </Row>
      </Container>
    </footer>
  );
}
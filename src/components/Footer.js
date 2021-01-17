import { Col, Container, Row } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer>
      <Container>
        <Row>
          <Col align="center">
            &copy; Fysikteknologsektionen {new Date().getFullYear()}
          </Col>          
        </Row>
      </Container>
    </footer>
  );
}
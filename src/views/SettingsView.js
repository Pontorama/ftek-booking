import { Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SettingsView = () => {
  return (
    <main>
      <Container>
        <Row>
          <Col>
            <Link to="/">&larr; Tillbaka</Link>
          </Col>
        </Row>
        <Row>
          <Col>
            Settings!
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default SettingsView;
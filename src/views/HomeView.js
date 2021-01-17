import { Col, Container, Form, Row } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function HomeView() {

  return (
    <main>
      <Container>
        <Row>
          <Col>
            <Form>
              <Form.Group>
                <Form.Label>Lokal</Form.Label>
                <Form.Control as="select" custom>

                </Form.Control>
              </Form.Group>
            </Form>            
          </Col>
        </Row>
        <Row>

        </Row>
      </Container>
      <Calendar />
    </main>
  );
}
import 'bootstrap/dist/css/bootstrap.css'
import '../css/App.css';
import { Container, Col, Row } from 'react-bootstrap';
import Day from './Day.js';
import TimeHeader from './TimeHeader';


function CalendarView(){
    return(      <Container>
        <Row>
          <Col><TimeHeader /></Col>
          <Col><Day day="Monday" /></Col>
          <Col><Day day="Tuesday" /></Col>
          <Col> <Day day="Wednesday" /></Col>
          <Col> <Day day="Thursday" /></Col>
          <Col> <Day day="Friday" /></Col>
          <Col> <Day day="Saturday" /></Col>
          <Col> <Day day="Sunday" /></Col>
        </Row>
        <div className="navigation">
        </div>
      </Container>);
}


export default CalendarView;

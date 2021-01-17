import { useEffect, useState } from 'react';
import { Col, Container, ListGroup, Row, Button } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function RoomView({ roomId }) {

  const [timeslots, setTimeslots] = useState([]);
  const [activeDate, setActiveDate] = useState(new Date()); // react-calendar uses today as default active date

  const WEEKDAYS = [6, 0, 1, 2, 3, 4, 5]; // MYSQL orders 0-6 as Mon-Sun, JS as Sun-Wed, this is used to fix that

  useEffect(_ => {
    fetch(`/rooms/${roomId}/timeslots`)
    .then(res => res.json())
    .then(data => setTimeslots(data));
  }, [roomId])

  const activeTimeslots = timeslots.filter(timeslot => (timeslot.weekday === WEEKDAYS[activeDate.getDay()]));
  
  const timeslotButtons = activeTimeslots.map(timeslot => <Button variant="light" block key={timeslot.id}>{`${timeslot.from.slice(0, 5)}-${timeslot.to.slice(0, 5)} ${timeslot.name}`}</Button>)

  return (
    <Container>
      <Row>
        <Col>
          <Calendar 
            onClickDay={date => setActiveDate(date)}
          />
        </Col>
        <Col>
          <Row>
            <Col>
              <p className="h4">Bokningsbara tider</p>
            </Col>
          </Row>
          <Row>
            {timeslotButtons}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
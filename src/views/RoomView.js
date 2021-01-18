import { useEffect, useState } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function RoomView({ roomId }) {
  const [timeslots, setTimeslots] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [activeDate, setActiveDate] = useState(new Date()); // react-calendar uses today as default active date

  const WEEKDAYS = [6, 0, 1, 2, 3, 4, 5]; // MYSQL orders 0-6 as Mon-Sun, JS as Sun-Wed, this is used to fix that

  useEffect(_ => {
    fetch(`/rooms/${roomId}/timeslots`)
    .then(res => res.json())
    .then(data => setTimeslots(data));
    fetch(`/rooms/${roomId}/reservations?year=${new Date().getFullYear()}&month=${new Date().getMonth()+1}`)
    .then(res => res.json())
    .then(data => setReservations(data));
  }, [roomId])

  function handleActiveStartDateChange({ activeStartDate, view }) {
    if (view === 'month') {
      fetch(`/rooms/${roomId}/reservations?year=${activeStartDate.getFullYear()}&month=${activeStartDate.getMonth()+1}`)
      .then(res => res.json())
      .then(data => setReservations(data));
    }
  }

  const activeDateTimeslots = timeslots.filter(timeslot => (timeslot.weekday === WEEKDAYS[activeDate.getDay()])); // Get timeslots for active date
  const activeDateReservations = reservations.filter(reservation => (new Date(reservation.date).getMonth() === activeDate.getMonth() && new Date(reservation.date).getDate() === activeDate.getDate())); // Get reservatopns for active date
    
  // Generate buttons for each timeslot depenant on booked/free
  const timeslotButtons = activeDateTimeslots.map(timeslot => {
    const timeslotReservations = activeDateReservations.filter(reservation => (reservation.timeslot === timeslot.id));
    return (timeslotReservations.length ? 
      <Button variant="danger" block key={timeslot.id}>{`${timeslot.from.slice(0, 5)}-${timeslot.to.slice(0, 5)} ${timeslot.name}`}</Button> :
      <Button variant="success" block key={timeslot.id}>{`${timeslot.from.slice(0, 5)}-${timeslot.to.slice(0, 5)} ${timeslot.name}`}</Button>)
  });

  return (
    <Container>
      <Row>
        <Col>
          <Calendar 
            onClickDay={date => setActiveDate(date)}
            onActiveStartDateChange={handleActiveStartDateChange}
          />
        </Col>
        <Col>
          <Row>
            <Col>
              <p className="h4">{`Tidsluckor för ${activeDate.toLocaleDateString()}`}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              {timeslotButtons}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
import ReservationInfoModal from './ReservationInfoModal';
import CreateReservationModal from './CreateReservationModal';
import { Col, Container, Row } from 'react-bootstrap';

const RoomTimeslots = ({ roomName, reservations, timeslots, selectedDate }) => {
  const selectedDateTimeslots = timeslots.filter((timeslot) => (
    timeslot.weekday === selectedDate.getDay()
  ));

  const selectedDateReservations = reservations.filter((reservation) => {
    const reservationDate = new Date(reservation.date);
    return (
      reservationDate.getMonth() === selectedDate.getMonth() &&
      reservationDate.getDate() === selectedDate.getDate()
    );
  });

  const timeslotButtons = selectedDateTimeslots.map((timeslot) => {
    console.log(timeslot);
    const timeslotReservation = selectedDateReservations.filter((reservation) => {
      console.log(reservation);
      return reservation.timeslot === timeslot.id;
    })[0];
    console.log(timeslotReservation);
    return (timeslotReservation ? 
      <ReservationInfoModal key={timeslot.id} timeslot={timeslot} reservation={timeslotReservation} /> :
      <CreateReservationModal key={timeslot.id} timeslot={timeslot} roomName={roomName} date={selectedDate} />
    );
  });

  return (
    <Container>
      <Row>
        <Col>
          <p className="h4">{`Bokningstider för ${roomName}, ${selectedDate.toLocaleDateString()}`}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          {timeslotButtons}
        </Col>
      </Row>

    </Container>
  );
};

export default RoomTimeslots;
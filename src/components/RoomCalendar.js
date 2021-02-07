import { useCallback, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../css/calendar.css';
import CreateReservationModal from '../components/CreateReservationModal';
import ReservationInfoModal from '../components/ReservationInfoModal';

const RoomCalendar = ({ roomId, roomName }) => {
  const [timeslots, setTimeslots] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [activeDate, setActiveDate] = useState(new Date()); // react-calendar uses today as default active date

  const WEEKDAYS = [6, 0, 1, 2, 3, 4, 5]; // MYSQL orders 0-6 as Mon-Sun, JS as Sun-Wed, this is used to fix that

  // Wrapped in memo so that useEffect is not called repeatedly
  const fetchReservations = useCallback(async (year, month) => {
    const res = await fetch(`/rooms/${roomId}/reservations?year=${year}&month=${month}`);
    setReservations(res.json());
  }, [roomId]);

  useEffect(() => {
    const fetchTimeslots = async () => {
      const res = await fetch(`/rooms/${roomId}/timeslots`);
      const timeslots = res.json();
      for (let i in timeslots) {
        const res = await fetch(`/timeslots/${timeslots[i].id}/inspection-times`);
        timeslots[i].inspectionTimes = res.json();
      }
      setTimeslots(timeslots);
    };
    fetchTimeslots();
    fetchReservations(new Date().getFullYear(), new Date().getMonth()+1); // Fetch initial reservations
  }, [roomId, fetchReservations]);

  const handleActiveStartDateChange = ({ activeStartDate, view }) => {
    if (view === 'month')
      fetchReservations(activeStartDate.getFullYear(), activeStartDate.getMonth()+1);
  };

  // Get timeslots for active date
  const activeDateTimeslots = timeslots.filter((timeslot) => (
    timeslot.weekday === WEEKDAYS[activeDate.getDay()]
  )); 

  // Get reservations for active date
  const activeDateReservations = reservations.filter((reservation) => (
    new Date(reservation.date).getMonth() === activeDate.getMonth() && new Date(reservation.date).getDate() === activeDate.getDate()
  ));
    
  const timeslotButtons = activeDateTimeslots.map((timeslot) => {
    // Get potential reservation for timeslot
    const timeslotReservation = activeDateReservations.filter((reservation) => (reservation.timeslot === timeslot.id))[0];
    return (timeslotReservation ? 
      <ReservationInfoModal key={timeslot.id} timeslot={timeslot} reservation={timeslotReservation} /> :
      <CreateReservationModal key={timeslot.id} timeslot={timeslot} roomName={roomName} activeDate={activeDate} />
    );
  });

  return (
    <Container>
      <Row>
        <Col>
          <Calendar 
            onClickDay={(date) => setActiveDate(date)}
            onActiveStartDateChange={handleActiveStartDateChange}
          />
        </Col>
        <Col className="mt-4 mt-md-0">
          <Row>
            <Col>
              <p className="h4">{`Bokningstider för ${roomName}, ${activeDate.toLocaleDateString()}`}</p>
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
};

export default RoomCalendar;
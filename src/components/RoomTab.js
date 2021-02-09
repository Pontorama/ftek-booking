import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import RoomCalendar from './RoomCalendar';
import RoomTimeslots from './RoomTimeslots';

const RoomTab = ({ room }) => {
  const [selectedDate, setSelectedDate] = useState(new Date()); // The date the user has clicked
  const [activeDate, setActiveDate] = useState(new Date()); // The date (year and month) the user is viewing in the calendar
  const [reservations, setReservations] = useState([]);
  const [timeslots, setTimeslots] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const res = await fetch(`/api/reservations/confirmed/${room.id}/${activeDate.getFullYear()}/${activeDate.getMonth()+1}`);
      const data = await res.json();
      setReservations(data);
    };
    const fetchTimeslots = async () => {
      const res = await fetch(`/api/timeslots/${room.id}`);
      const data = await res.json();
      setTimeslots(data);
    };
    fetchReservations();
    fetchTimeslots();
  }, [room.id, activeDate]);

  return(
    <Container>
      <Row>
        <Col>
          <RoomCalendar 
            room={room} 
            reservations={reservations} 
            selectedDate={selectedDate} 
            setSelectedDate={setSelectedDate} 
            setActiveDate={setActiveDate}
          />
        </Col>
        <Col>
          <RoomTimeslots 
            roomName={room.name} 
            reservations={reservations} 
            timeslots={timeslots} 
            selectedDate={selectedDate}
          />
        </Col>
      </Row>    
    </Container>
  );
};

export default RoomTab;
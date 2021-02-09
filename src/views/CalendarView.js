import { useEffect, useState } from 'react';
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import RoomTab from '../components/RoomTab';

const CalendarView = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const res = await fetch('/api/rooms');
      const data = await res.json();
      setRooms(data);
    };
   fetchRooms();
  }, []);

  const roomTabs = rooms.map((room) => (
    <Tab key={room.id} eventKey={room.id} title={room.name}>
      <RoomTab room={room} />
    </Tab>
  ));

  return (
    <main>
      <Container>
        <Row>
          <Col>
            <Tabs className="mb-3">
              {roomTabs}
            </Tabs>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default CalendarView;
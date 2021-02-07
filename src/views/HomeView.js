import { Tab } from 'bootstrap';
import { useEffect, useState } from 'react';
import { Col, Container, Row,Tabs } from 'react-bootstrap';
import RoomCalendar from '../components/RoomCalendar';

const HomeView = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const res = await fetch('/api/rooms');
      setRooms(res.json());
    };
   fetchRooms();
  }, []);

  const roomTabs = rooms.map((room) => (
    <Tab key={room.id} eventKey={room.id} title={room.name}>
      <RoomCalendar roomId={room.id} roomName={room.name} />
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

export default HomeView;
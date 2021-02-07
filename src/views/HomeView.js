import { Tab } from 'bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Col, Container, Row,Tabs } from 'react-bootstrap';
import RoomView from './RoomView';
import UserSessionContext from '../context/UserSessionContext';
import PendingReservations from '../components/PendingReservations';

export default function HomeView() {
  const { userSession } = useContext(UserSessionContext);
  const [rooms, setRooms] = useState([]);

  useEffect(_=> {
    fetch('/rooms')
    .then(res => res.json())
    .then(data => setRooms(data));
  }, []);
  
  const roomTabs = rooms.map(room => <Tab key={room.id} eventKey={room.id} title={room.name}><RoomView roomId={room.id} roomName={room.name} /></Tab>);

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
}
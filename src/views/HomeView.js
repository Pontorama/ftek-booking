import { Tab } from 'bootstrap';
import { useEffect, useState } from 'react';
import { Container, Spinner, Tabs } from 'react-bootstrap';
import RoomView from './RoomView';

export default function HomeView() {
  const [rooms, setRooms] = useState([]);

  useEffect(_=> {
    fetch('/rooms')
    .then(res => res.json())
    .then(data => setRooms(data));
  }, []);
  
  const roomTabs = rooms.map(room => <Tab key={room.id} eventKey={room.id} title={room.name}><RoomView roomId={room.id} /></Tab>);

  return (
    <main>
      <Container>
        <Tabs className="mb-2" >
          {roomTabs}
        </Tabs>
      </Container>
    </main>
  );
}
import { useEffect, useState } from 'react';
import { Accordion, Card } from 'react-bootstrap';

const PendingReservations = () => {
  const [pendingReservations, setPendingReservations] = useState([]);

  useEffect(() => {
    const fetchPendingReservations = async () => {
      const res = await fetch('/reservations/pending');
      setPendingReservations(res.json());
    };
    fetchPendingReservations();
  }, []);

  const pendingReservationsListItems = pendingReservations.map((reservation) => (
    <Card key={reservation.id}>
      <Card.Header>
        <Accordion.Toggle as={Button} type="link" eventKey={reservation.id}>
          <span>
            {`${reservation.room}, ${new Date(reservation.date).toLocaleDateString()}, ${reservation.from.slice(0, 5)}-${reservation.to.slice(0, 5)} ${reservation.timeslot}`}
          </span>
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey={reservation.id}>
        <Card.Body>
          <ul className="p-0 d-flex flex-column">
            <item><strong>Tid inskickad: </strong>{`${new Date(reservation.timestamp).toLocaleDateString()} ${new Date(reservation.timestamp).toLocaleTimeString()}`}</item>
            <item className="mt-3"><strong>Lokal: </strong>{reservation.room}</item>
            <item><strong>Datum: </strong>{new Date(reservation.date).toLocaleDateString()}</item>
            <item><strong>Tid: </strong>{`${reservation.from.slice(0, 5)}-${reservation.to.slice(0, 5)} ${reservation.timeslot}`}</item>
            {reservation.inspectionTime && <item><strong>Avsyningstid: </strong>{reservation.inspectionTime.slice(0, 5)}</item>}
            <item className="mt-3"><strong>Namn: </strong>{reservation.name}</item>
            <item><strong>E-postadress: </strong>{reservation.email}</item>
            <item><strong>CID: </strong>{reservation.cid}</item>
            {reservation.society && <item><strong>Kommitté/Förening: </strong>{reservation.society}</item>}
            <item><strong>Arrangemang: </strong>{reservation.description}</item>
          </ul>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  ));

  return (
    <>
      <p className="h4">Bokningsförfrågningar</p>
      {pendingReservations.length !== 0 ? (
        <Accordion>
          {pendingReservationsListItems}
        </Accordion>
      ) :
        <p>Inga nya bokningsförfrågningar!</p>
      }
    </>
  );
};

export default PendingReservations;
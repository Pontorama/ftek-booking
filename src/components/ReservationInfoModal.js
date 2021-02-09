import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const ReservationInfoModal = ({ timeslot, reservation }) => {
  const [showModal, setShowModal] = useState(false);
  const timeslotString = `${timeslot.fromTime.slice(0, 5)}-${timeslot.toTime.slice(0, 5)} ${timeslot.name}`;

  return (
    <>
      <Button variant="lightcoral" block onClick={() => setShowModal(true)}>{timeslotString}</Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Den valda tiden är redan bokad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{`${new Date(reservation.date).toLocaleDateString()} ${timeslotString}`}</p>
          <p>{reservation.society && `Bokad av: ${reservation.society}`}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Stäng</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReservationInfoModal;
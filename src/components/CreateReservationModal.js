import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default function CreateReservationModal({ timeslot, activeDate }) {
  const [showModal, setShowModal] = useState(false);
  const timeslotString = `${timeslot.from.slice(0, 5)}-${timeslot.to.slice(0, 5)} ${timeslot.name}`;

  return (
    <>
      <Button variant="primary" block onClick={_ => setShowModal(true)}>{timeslotString}</Button>
      <Modal show={showModal} onHide={_ => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{`Boka ${activeDate.toLocaleDateString()} ${timeslotString}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {/* ADD FORM HERE */}
        </Modal.Body>
      </Modal>
    </>
  );
}
import { useState } from 'react';
import { Button, Modal, Nav } from 'react-bootstrap';

export default function HelpModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Nav.Link onClick={_ => setShowModal(true)}>Hjälp</Nav.Link>
      <Modal show={showModal} onHide={_ => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Hjälp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="h5">För att visa bokningar</p>
          <ol>
            <li>Välj först bokningsobjekt genom att klicka på det i navigeringsmenyn.</li>
            <li>Välj önskad dag i kalendern genom att klicka på den.</li>
            <li>Lediga och bokade tider dyker upp till höger (nedanför kalendern på vissa enheter). <em>Observera att bokningsförfrågningar som ännu inte blivit behandlade inte visas</em>.</li>
          </ol>
          <p className="h5">För att lägga bokningar</p>
          <ol>
            <li>Läs först igenom bokningsreglerna som du finner i den översta navigeringsmenyn.</li>
            <li>Följ ovanstående instruktioner för att navigera till en dag med en ledig tid.</li>
            <li>Klicka på den önskade tiden och fyll i formuläret som visas.</li>
            <li>Klart! Du får ett mail som bekräftelse på din bokningsförfrågan. När din bokningsförfrågan har blivit behandlad får du ett till mail där det står om din bokning godkändes eller inte. Godkänns din bokning dyker den upp i kalendern och ingen annan kan boka samma tid.</li>
          </ol>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={_ => setShowModal(false)}>Stäng</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
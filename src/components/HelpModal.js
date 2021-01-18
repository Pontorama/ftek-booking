import { Modal } from 'react-bootstrap';

export default function HelpModal({showHelpModal, setShowHelpModal}) {
  return (
    <Modal show={showHelpModal} onHide={_ => setShowHelpModal(false)}>
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
          <li>Följ ovanstående instruktioner för att navigera till en dag med en ledig tidslucka.</li>
          <li>Klicka på den önskade tiden och fyll i formuläret som visas.</li>
          <li>Klart! Du får ett mail som bekräftelse på din bokningsförfrågan. När din bokningsförfrågan har blivit behandlad får du ett till mail där det står om din bokning godkändes eller inte. Godkänns din bokning dyker den upp i kalendern och ingen annan kan boka samma tidslucka.</li>
        </ol>
      </Modal.Body>
    </Modal>
  );
}
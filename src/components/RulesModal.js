import { useState } from 'react';
import { Button, Modal, Nav } from 'react-bootstrap';

const RulesModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Nav.Link onClick={() => setShowModal(true)}>Bokningsregler</Nav.Link>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Bokningsregler</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="h5">Följande regler gäller vid bokning av Focus/Hilbert</p>
          <ul>
            <li>GU-studenter kan bara boka Focus bardel på helger.</li>
            <li>Fysikteknologer kan bara boka Hilbert på helger.</li>
            <li>Innan bokningsdatumet behöver du betala gällande deposition.</li>
            <li>Efter bokningsdatumet får du tillbaka depositionen minus hyran samt möjliga avgifter för otillräcklig städning eller skada på lokalen.</li>
            <li>Du kan få reda på mer information om bl.a. hyra och deposition genom att kontakta <a href="mailto:dp.rust@ftek.se" target="_blank" rel="noreferrer">Rustmästaren</a>.</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>Stäng</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RulesModal;
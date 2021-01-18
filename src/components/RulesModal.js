import { Modal } from 'react-bootstrap';

export default function RulesModal({showRulesModal, setShowRulesModal}) {
  return (
    <Modal show={showRulesModal} onHide={_ => setShowRulesModal(false)}>
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
    </Modal>
  );
}
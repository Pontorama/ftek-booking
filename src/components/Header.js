import { useState } from 'react';
import { Button, Container, Form, Modal, Nav, Navbar } from 'react-bootstrap';
import ftekLogo from '../img/ftek.svg';

export default function Header() {

  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const helpModal = (
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

  const rulesModal = (
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

  function handleSubmit(event) {
    event.preventDefault();
    const formData = {
      email: event.target.email.value,
      password: event.target.password.value
    };
    fetch('/login', {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(res => {
      if (res.ok) {
        
      }
    })
  }

  const loginModal = (
    <Modal show={showLoginModal} onHide={_ => setShowLoginModal(false)}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Logga in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted">Logga in för att hantera bokningar.</p>
            <Form.Group controlId="loginFormEmail">
              <Form.Label>E-postadress</Form.Label>
              <Form.Control name="email" type="email" placeholder="Skriv in din e-postadress" />
            </Form.Group>
            <Form.Group controlId="loginFormPassword">
              <Form.Label>Lösenord</Form.Label>
              <Form.Control name="password" type="password" placeholder="Skriv in ditt lösenord" />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Logga in
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );

  return (
    <header>
      <Navbar bg="light" variant="light" className="mb-3">
        <Container>
          <Navbar.Brand>
            <img 
              src={ftekLogo}
              alt=""
              className="mr-3"
              width="60"
              height="60"
            />
            <span className="align-middle">Lokalbokning</span>
          </Navbar.Brand>
          <Nav>
            <Nav.Link onClick={_ => setShowHelpModal(true)}>Hjälp</Nav.Link>
            <Nav.Link onClick={_ => setShowRulesModal(true)}>Bokningsregler</Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end" />
          <Navbar.Text>
            <Button variant="outline-secondary" onClick={_ => setShowLoginModal(true)} >Logga in</Button>
          </Navbar.Text>
        </Container>
      </Navbar>
      {helpModal}
      {rulesModal}
      {loginModal}      
    </header>
  );
}
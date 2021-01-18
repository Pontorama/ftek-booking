import { useState, useContext } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserSessionContext from '../context/UserSessionContext';
import ftekLogo from '../img/ftek.svg';
import HelpModal from './HelpModal';
import LoginModal from './LoginModal';
import RulesModal from './RulesModal';

export default function Header() {
  const { userSession, setUserSession } = useContext(UserSessionContext);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  function handleLogout() {
    fetch('/logout', {
      method: 'DELETE'
    })
    .then(_ => setUserSession(null));
  }

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
            {userSession && <Nav.Link as={Link} to="/">Hem</Nav.Link>}
            {userSession && <Nav.Link as={Link} to="/dashboard">Hantera bokningar</Nav.Link>}
          </Nav>
          <Navbar.Collapse className="justify-content-end" />
          <Navbar.Text>
            {userSession ? 
            <Button className="shadow-none" variant="outline-danger" onClick={handleLogout}>Logga ut</Button> :
            <Button className="shadow-none" variant="outline-secondary" onClick={_ => setShowLoginModal(true)} >Logga in</Button>}         
          </Navbar.Text>
        </Container>
      </Navbar>
      <HelpModal showHelpModal={showHelpModal} setShowHelpModal={setShowHelpModal} />
      <RulesModal showRulesModal={showRulesModal} setShowRulesModal={setShowRulesModal} />
      <LoginModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} />    
    </header>
  );
}
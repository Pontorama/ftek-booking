import { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserSessionContext from '../context/UserSessionContext';
import ftekLogo from '../img/ftek.svg';
import HelpModal from './HelpModal';
import LoginModal from './LoginModal';
import RulesModal from './RulesModal';

export default function Header() {
  const { userSession } = useContext(UserSessionContext);

  return (
    <header>
      <Navbar bg="light" variant="light" expand="md" className="mb-3">
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
          <Navbar.Toggle aria-controls="navbar-collapse" />
          <Navbar.Collapse iD="navbar-collapse">
            <Nav>
              <HelpModal />
              <RulesModal />
              {userSession && <Nav.Link as={Link} to="/">Hem</Nav.Link>}
              {userSession && <Nav.Link as={Link} to="/dashboard">Hantera bokningar</Nav.Link>}
            </Nav>
            <Navbar.Collapse className="justify-content-end" />
            <Navbar.Text>
              <LoginModal />  
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
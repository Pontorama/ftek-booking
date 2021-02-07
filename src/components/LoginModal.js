import { useContext, useState } from 'react';
import {Alert, Button, Form, Modal } from 'react-bootstrap';
import UserSessionContext from '../utils/UserSessionContext';
import Cookies from 'js-cookie';

const LoginModal = () => {
  const { userSession, setUserSession } = useContext(UserSessionContext);
  const [showModal, setShowModal] = useState(false);
  const [loginError, setLoginError] = useState(false);
  
  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginError(false);
    const formData = {
      email: event.target.email.value,
      password: event.target.password.value
    };
    const res = await fetch(
      '/login',
      {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }
    );
    if (res.ok) {
      setUserSession(Cookies.getJSON('user'));
      setShowModal(false);
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = async () => {
    await fetch('/logout', { method: 'DELETE' });
    setUserSession(null);
  };

  return (
    <>
      {userSession ? 
        <Button className="shadow-none" variant="outline-danger" onClick={handleLogout}>Logga ut</Button> :
        <Button className="shadow-none" variant="outline-secondary" onClick={() => setShowModal(true)} >Logga in</Button>
      }       
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Form onSubmit={handleLogin}>
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
              {loginError && <Alert variant="danger">Kunde inte logga in, var god kontrollera användaruppgifterna och försök igen.</Alert>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Stäng</Button>
            <Button variant="lightblue" type="submit">Logga in</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default LoginModal;
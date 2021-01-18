import { useContext, useState } from 'react';
import {Alert, Button, Form, Modal } from 'react-bootstrap';
import UserSessionContext from '../context/UserSessionContext';
import Cookies from 'js-cookie';

export default function LoginModal({showLoginModal, setShowLoginModal}) {
  const { setUserSession } = useContext(UserSessionContext);
  const [loginError, setLoginError] = useState(false);
  
  function handleLogin(event) {
    event.preventDefault();
    setLoginError(false);
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
        setUserSession(Cookies.getJSON('user'));
        setShowLoginModal(false);
      } else {
        setLoginError(true);
      }
    })
  }

  return (
    <Modal show={showLoginModal} onHide={_ => setShowLoginModal(false)}>
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
            {loginError && <Alert variant="danger">Kunde inte logga in, kontrollera användaruppgifterna och försök igen.</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Logga in
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
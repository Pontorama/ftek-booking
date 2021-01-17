import { Navbar } from 'react-bootstrap';

export default function Header() {
  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          Fysikteknologsektionen lokalbokning
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end" />
        <Navbar.Text>
          Logga in
        </Navbar.Text>
      </Navbar>
    </header>
  );
}
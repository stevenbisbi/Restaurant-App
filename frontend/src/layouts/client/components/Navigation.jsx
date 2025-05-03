import React from 'react';
import { Button, Container, Nav, Navbar} from 'react-bootstrap';

export function Navigation() {
  return (
    <Navbar expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="#" className='px-5'>Salchipapa</Nav.Link>
            <Nav.Link href="#" className='px-5'>Hamburgesa</Nav.Link>
            <Nav.Link href="#" className='px-5'>Emparedado</Nav.Link>
            <Nav.Link href="#" className='px-5'>Perros</Nav.Link>
            <Nav.Link href="#" className='px-5'>Bebidas</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

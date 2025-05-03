import React from 'react';
import { Button, Container, Nav, Navbar} from 'react-bootstrap';
import './../../../styles/Navigation.css';

export function Navigation() {
  return (
    <Navbar expand="md" bg="light" variant="light">
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="#" className='px-5 navigation-link'>Salchipapa</Nav.Link>
            <Nav.Link href="#" className='px-5 navigation-link'>Hamburgesa</Nav.Link>
            <Nav.Link href="#" className='px-5 navigation-link'>Emparedado</Nav.Link>
            <Nav.Link href="#" className='px-5 navigation-link'>Perros</Nav.Link>
            <Nav.Link href="#" className='px-5 navigation-link'>Bebidas</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import "./../../../styles/Navigation.css";
import { Avatar } from "../components/Avatar";

export function Navigation() {
  const username =
    localStorage.getItem("username") ||
    sessionStorage.getItem("username") ||
    "Usuario";
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  return (
    <Navbar expand="md" bg="light" variant="light">
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto d-flex justify-content-center align-items-center">
            <Nav.Link href="#" className="px-5 navigation-link">
              Salchipapa
            </Nav.Link>
            <Nav.Link href="#" className="px-5 navigation-link">
              Hamburgesa
            </Nav.Link>
            <Nav.Link href="#" className="px-5 navigation-link">
              Emparedado
            </Nav.Link>
            <Nav.Link href="#" className="px-5 navigation-link">
              Perros
            </Nav.Link>
            <Nav.Link href="#" className="px-5 navigation-link">
              Bebidas
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <div className="user-info d-flex align-items-center px-5">
        <Avatar username={username} />
        <div className="user-info-body px-4">
          <div className="user-info-name">{username || "Usuario"}</div>
          <div className="user-info-avatar font-size">Cliente</div>
        </div>
      </div>
    </Navbar>
  );
}

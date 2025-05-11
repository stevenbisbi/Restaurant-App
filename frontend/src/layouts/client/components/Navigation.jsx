import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useState } from "react";
import "./../../../styles/Navigation.css";
import { Avatar } from "../components/Avatar";

export function Navigation() {
  const username =
    localStorage.getItem("username") ||
    sessionStorage.getItem("username") ||
    "Usuario";

  // Estado para manejar la visibilidad del aside
  const [isAsideVisible, setIsAsideVisible] = useState(false);

  // Función para alternar la visibilidad del aside
  const toggleAside = () => {
    setIsAsideVisible(!isAsideVisible);
  };
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
      <div
        className="user-info d-flex align-items-center px-5"
        onClick={toggleAside}
      >
        <Avatar username={username} />
        <div className="user-info-body px-4">
          <div className="user-info-name">{username}</div>
          <div className="user-info-avatar font-size">Cliente</div>
        </div>
      </div>

      {/* Aside que se despliega */}
      {isAsideVisible && (
        <aside className="user-info-aside">
          <div className="aside-content">
            <h3>Información del Usuario</h3>
            <p>Más detalles del usuario...</p>
            <Button onClick={toggleAside}>Cerrar</Button>
          </div>
        </aside>
      )}
    </Navbar>
  );
}

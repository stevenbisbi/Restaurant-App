  import React from "react";
  import { Button, Container, Nav, Navbar } from "react-bootstrap";
  import "./../../../styles/Navigation.css";
  import { Avatar } from "../components/Avatar";
  import { OffCanvas } from "./OffCanvas";

  export function Navigation() {
    const username =
      localStorage.getItem("username") ||
      sessionStorage.getItem("username") ||
      "Usuario";

        
    return (
      <>
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
          <button
              className="btn btn-light d-flex align-items-center"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasScrolling"
              aria-controls="offcanvasScrolling"
            >
          <Avatar username={username} />
          <div className="user-info-body px-4">
            <div className="user-info-name">{username || "Usuario"}</div>
            <div className="user-info-avatar font-size">Cliente</div>
          </div>
            
          </button>
        </div>
      </Navbar>
      
      <OffCanvas username={username}/>
      
      </>
    );
  }

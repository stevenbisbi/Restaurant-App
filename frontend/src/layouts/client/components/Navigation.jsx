import { Button, Container, Nav, Navbar } from "react-bootstrap";
import "./../../../styles/Navigation.css";
import { Avatar } from "../components/Avatar";
import { OffCanvas } from "./OffCanvas";
import fondo from "../../../assets/img/fondo-comida.avif";

export function Navigation() {
  const username =
    localStorage.getItem("username") ||
    sessionStorage.getItem("username") ||
    "Usuario";

  return (
    <>
      <Navbar
        expand="md"
        bg="light"
        variant="light"
        fixed="top"
        className="shadow-sm"
      >
        <Container>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto d-flex justify-content-center align-items-center">
              <Nav.Link href="#" className="px-5 navigation-link fs-5">
                Salchipapa
              </Nav.Link>
              <Nav.Link href="#" className="px-5 navigation-link fs-5">
                Hamburgesa
              </Nav.Link>
              <Nav.Link href="#" className="px-5 navigation-link fs-5">
                Emparedado
              </Nav.Link>
              <Nav.Link href="#" className="px-5 navigation-link fs-5">
                Perros
              </Nav.Link>
              <Nav.Link href="#" className="px-5 navigation-link fs-5">
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
          </button>
        </div>
      </Navbar>

      <OffCanvas username={username} />

      <img
        src={fondo}
        alt="Logo del restaurante"
        className="d-inline-block align-top"
        style={{ height: "400px", width: "auto", objectFit: "cover" }}
      />
    </>
  );
}

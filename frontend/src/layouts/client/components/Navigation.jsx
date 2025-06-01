import { Container, Nav, Navbar } from "react-bootstrap";
import "./../../../styles/Navigation.css";
import { Avatar } from "../components/Avatar";
import { OffCanvas } from "./OffCanvas";
import fondo from "../../../assets/img/fondo-comida.avif";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function Navigation() {
  const token = useSelector((state) => state.auth.token);
  const name =
    localStorage.getItem("firstName") ||
    sessionStorage.getItem("firstName") ||
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

          
          <Link
            to="/"
            className="text-danger text-decoration-none fs-5 mx-5"
          >
            Home
          </Link>
          
          <Link
            to={token ? "/reservar" : "/login"}
            className="text-danger text-decoration-none fs-5 mx-5"
          >
            Reservar
          </Link>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto d-flex justify-content-center align-items-center">
              <Nav.Link
                href="/salchipapa"
                className="px-5 navigation-link fs-5"
              >
                Salchipapa
              </Nav.Link>
              <Nav.Link href="hamburguesa" className="px-5 navigation-link fs-5">
                Hamburguesa
              </Nav.Link>
              <Nav.Link href="emparedados" className="px-5 navigation-link fs-5">
                Emparedado
              </Nav.Link>
              <Nav.Link href="perros" className="px-5 navigation-link fs-5">
                Perros
              </Nav.Link>
              <Nav.Link href="bebidas" className="px-5 navigation-link fs-5">
                Bebidas
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>

        {token ? (
          <div className="user-info d-flex align-items-center px-5">
            <button
              className="btn btn-light d-flex align-items-center"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasScrolling"
              aria-controls="offcanvasScrolling"
            >
              <Avatar name={name} />
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="text-danger text-decoration-none user-info d-flex align-items-center px-5"
          >
            Inicia sesión
          </Link>
        )}
      </Navbar>

      {/* Renderiza el OffCanvas solo si hay token */}
      {token && <OffCanvas name={name} />}

      <img
        src={fondo}
        alt="Logo del restaurante"
        className="d-inline-block align-toa"
        style={{ height: "400px", width: "auto", objectFit: "cover" }}
      />
    </>
  );
}

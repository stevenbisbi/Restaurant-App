import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { useState } from "react";
import "./../../../styles/Navigation.css";
import { Avatar } from "../components/Avatar";
import { OffCanvas } from "./OffCanvas";
import fondo from "../../../assets/img/fondo-comida.avif";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { removeItemFromCart } from "../../../redux/cartSlice";
import { Link } from "react-router-dom";

export function Navigation() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const name = useSelector((state) => state.auth.firstName); // Obtén del estado
  const cart = useSelector(selectCartItems);
  const [showCart, setShowCart] = useState(false);

  const handleClose = () => setShowCart(false);
  const handleShow = () => setShowCart(true);
  const removeFromCart = (item) => {
    dispatch(removeItemFromCart({ itemId: item.id })); // Pasa el ID del item
  };

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
              <Nav.Link
                href="/salchipapa"
                className="px-5 navigation-link fs-5"
              >
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

        {token ? (
          <div className="user-info d-flex align-items-center px-5">
            {/* Botón para abrir Offcanvas, controlado por React */}
            <Button
              variant="light"
              onClick={handleShow}
              className="d-flex align-items-center"
            >
              <Avatar name={name || "Usuario"} />
            </Button>
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
      {token && (
        <OffCanvas
          show={showCart}
          handleClose={handleClose}
          cart={cart}
          name={name}
          removeFromCart={removeFromCart}
        />
      )}

      <img
        src={fondo}
        alt="Logo del restaurante"
        className="d-inline-block align-toa"
        style={{ height: "400px", width: "auto", objectFit: "cover" }}
      />
    </>
  );
}

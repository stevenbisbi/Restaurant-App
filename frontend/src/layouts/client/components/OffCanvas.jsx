import { Offcanvas, Button, ListGroup } from "react-bootstrap";
import { Avatar } from "./Avatar";
import { LogoutButton } from "./LogoutButton";

export function OffCanvas({ show, handleClose, cart, name }) {
  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      scroll={true}
      backdrop={true}
    >
      <Offcanvas.Header closeButton>
        <div className="d-flex align-items-center gap-3">
          <Avatar name={name} />
          <div>
            <h4 className="mb-0 fw-normal">{name || "Usuario"}</h4>
            <small className="text-muted">Cliente</small>
          </div>
        </div>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cart.length === 0 ? (
          <p className="text-muted">Tu carrito está vacío.</p>
        ) : (
          <ListGroup>
            {cart.map((item, index) => (
              <ListGroup.Item key={index}>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="img-thumbnail me-2"
                    style={{ width: "50px", height: "50px" }}
                  />
                )}
                {item.name} x {item.quantity || 1} - $
                {item.price * (item.quantity || 1)} <br />
                {item.selectedOptions?.length > 0 && (
                  <span className="text-muted">
                    {" "}
                    (Adiciones:{" "}
                    {item.selectedOptions.map((opt) => opt.name).join(", ")})
                  </span>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
        <Button
          variant="primary"
          className="mt-3"
          onClick={() => alert("Proceder al pago")}
        >
          Ir a pagar
        </Button>

        <hr />
        <LogoutButton />
      </Offcanvas.Body>
    </Offcanvas>
  );
}

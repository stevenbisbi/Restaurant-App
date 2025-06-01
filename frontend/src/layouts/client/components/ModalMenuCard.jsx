import { Modal, Button, Row } from "react-bootstrap";
import { useState } from "react";

export function ModalMenuCard({ item, show, onHide, onAddToCart }) {
  console.log("item", item);

  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const toggleOption = (id) => {
    setSelectedOptions(
      (prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((optId) => optId !== id) // si ya está, lo quita
          : [...prevSelected, id] // si no está, lo agrega
    );
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
      dialogClassName="modal-horizontal"
    >
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">{item?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-row p-1">
        <div className="d-flex justify-content-center align-items-center">
          <img
            src={item?.image}
            className="img-fluid rounded-start"
            style={{ maxWidth: "300px", maxHeight: "300px" }}
            alt={item?.name}
          />
        </div>
        <div
          className="col-md-6 p-4 overflow-y-auto text-center"
          style={{ maxHeight: "70vh" }}
        >
          <p>
            <strong>Descripción:</strong>
          </p>
          <p className="text-muted">{item?.description}</p>

          {Array.isArray(item?.options) && item.options.length > 0 ? (
            <div>
              <p>
                <strong>Adiciones</strong>
              </p>
              {item.options.map((opt) => (
                <Button
                  key={opt.id}
                  onClick={() => toggleOption(opt.id)}
                  variant={
                    selectedOptions.includes(opt.id)
                      ? "primary"
                      : "outline-secondary"
                  }
                  className="m-1"
                >
                  {opt.image_url && (
                    <img
                      src={opt.image_url}
                      alt={opt.name}
                      style={{ width: "30px" }}
                    />
                  )}
                </Button>
              ))}
            </div>
          ) : (
            <p className="text-muted">Sin opciones</p>
          )}

          <Row className="d-flex justify-content-center">
            <Button variant="danger" className="col-5 m-1">
              $1000 Personal
            </Button>
            <Button variant="danger" className="col-5 m-1">
              $1000 Pareja
            </Button>
          </Row>
          <Row className="d-flex justify-content-center">
            <Button variant="danger" className="col-5 m-1">
              $1000 Mediana
            </Button>
            <Button variant="danger" className="col-5 m-1">
              $1000 Familiar
            </Button>
          </Row>
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between align-items-center">
        <div className="alert alert-info text-dark">
          $ {(item?.price * quantity).toLocaleString("es-CO")}
        </div>
        <div>
          <Button
            onClick={handleDecrement}
            variant="light"
            className="rounded-circle shadow-sm me-2"
            style={{ width: "40px", height: "40px" }}
          >
            <strong>-</strong>
          </Button>
          <span className="fs-5">{quantity}</span>
          <Button
            onClick={handleIncrement}
            variant="light"
            className="rounded-circle shadow-sm ms-2"
            style={{ width: "40px", height: "40px" }}
          >
            <strong>+</strong>
          </Button>

          <Button
            variant="warning"
            onClick={() => {
              const itemToAdd = {
                iditem: item.iditem,
                name: item.name,
                price: item.price,
                quantity,
                selectedOptions,
              };
              onAddToCart(itemToAdd); // lo envía a MenuPage
              onHide(); // cierra el modal
            }}
          >
            Agregar al carrito
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

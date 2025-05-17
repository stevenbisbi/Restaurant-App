import { Modal, Button, Row } from "react-bootstrap";
import { useState } from "react";

export function ModalMenuCard({ meal, show, onHide }) {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
      dialogClassName="modal-horizontal"
    >
      <Modal.Header closeButton>
        <Modal.Title>{meal?.strMeal}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-row p-1">
        <div className="d-flex justify-content-center">
          <img
            src={meal?.strMealThumb}
            className="img-fluid rounded-start"
            style={{ maxWidth: "300px", maxHeight: "300px" }}
            alt={meal?.strMeal}
          />
        </div>
        <div
          className="col-md-6 p-4 overflow-y-auto text-center"
          style={{ maxHeight: "70vh" }}
        >
          <p>ingredientes</p>
          <Row className="d-flex justify-content-center">
            {" "}
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
              $1000 Familar
            </Button>{" "}
          </Row>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={handleDecrement}
          variant="light"
          className="rounded-circle shadow-sm"
          style={{ width: "40px", height: "40px" }}
        >
          <strong>-</strong>
        </Button>
        <span className="fs-5">{quantity}</span>
        <Button
          onClick={handleIncrement}
          variant="light"
          className="rounded-circle shadow-sm"
          style={{ width: "40px", height: "40px" }}
        >
          <strong>+</strong>
        </Button>
        <Button variant="warning" onClick={onHide}>
          agregar al carrito
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

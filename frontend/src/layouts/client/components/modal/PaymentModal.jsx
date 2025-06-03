import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-hot-toast";

export function PaymentModal({ show, handleClose }) {
  const [selectedMethod, setSelectedMethod] = useState("");

  const handlePay = () => {
    if (!selectedMethod) {
      toast.error("Por favor selecciona un método de pago.");
      return;
    }
    const id = toast.loading(`Procesando pago con ${selectedMethod}`);
    // Simula una respuesta luego de 2 segundos
    setTimeout(() => {
      const exito = true; // cambia a false para simular error

      if (exito) {
        toast.success("Pago realizado con éxito", { id });
      } else {
        toast.error("Error al procesar el pago", { id });
      }
    }, 6000);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">Método de pago</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Selecciona tu método de pago preferido para continuar con tu orden:
        </p>
        <Form>
          <Form.Check
            type="radio"
            label="PSE (Pagos seguros en línea)"
            name="paymentMethod"
            value="PSE"
            onChange={(e) => setSelectedMethod(e.target.value)}
          />
          <Form.Check
            type="radio"
            label="Tarjeta de crédito o débito"
            name="paymentMethod"
            value="Tarjeta"
            onChange={(e) => setSelectedMethod(e.target.value)}
          />
          <Form.Check
            type="radio"
            label="Nequi"
            name="paymentMethod"
            value="Nequi"
            onChange={(e) => setSelectedMethod(e.target.value)}
          />
          <Form.Check
            type="radio"
            label="Daviplata"
            name="paymentMethod"
            value="Daviplata"
            onChange={(e) => setSelectedMethod(e.target.value)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button
          variant="secondary"
          onClick={() => {
            toast.success("Se generará un recibo para pago físico.", {
              autoClose: 6000,
            });
            handleClose();
          }}
        >
          Pagar con recibo
        </Button>
        <Button variant="success" onClick={handlePay}>
          Confirmar y pagar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../../redux/cartSlice";

export function PaymentModal({ show, handleClose }) {
  const dispatch = useDispatch();
  const [selectedMethod, setSelectedMethod] = useState("");

  const handlePayFizical = () => {
    const id = toast.loading("Generando recibo para pago físico...");
    // Simula una respuesta luego de 2 segundos
    setTimeout(() => {
      const exito = true; // cambia a false para simular error
      if (exito) {
        toast.success("Recibo generado con éxito", { id });
        toast.success(
          "Por favor, acércate a nuestra sede para completar el pago.",
          { id }
        );
        dispatch(clearCart());
      } else {
        toast.error("Error al generar el recibo", { id });
      }
    }, 3000);
    handleClose();
  };

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
        toast.success(
          `Recibirás un correo de confirmación y tu pedido será enviado pronto.`,
          { id }
        );

        dispatch(clearCart());
      } else {
        toast.error("Error al procesar el pago", { id });
      }
    }, 5000);
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
            handlePayFizical();
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

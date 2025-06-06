import { useEffect, useState } from "react";
import { useOrderSocket } from "../../../../hooks/useOrderSocket";
import axiosClient from "../../../../api/axiosClient"; // tu instancia Axios configurada

export function OrderCard({ orderId }) {
  const [order, setOrder] = useState(null); // ← Guardamos toda la orden
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { socketReady, sendStatus } = useOrderSocket(orderId, (newStatus) => {
    console.log("WebSocket: recibí nuevo estado ->", newStatus);
    // Actualizamos solo el status dentro de la orden
    setOrder((prevOrder) => ({ ...prevOrder, status: newStatus }));
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        console.log(orderId);
        const response = await axiosClient.get(`/orders/order/${orderId}/`);
        setOrder(response.data); // ← Guardamos toda la orden
      } catch (err) {
        console.error("Error al obtener orden:", err);
        setError("No se pudo cargar la información de la orden.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <p>Cargando orden…</p>;
  }
  if (error) {
    return <p className="text-danger">{error}</p>;
  }
  return (
    <div className="container py-4">
      <h4>Orden #{orderId}</h4>
      <p>
        <strong>Cliente:</strong> {order.customer || "Anonino"}
      </p>
      <p>
        <strong>Camarero:</strong> {order.staff || "No asignado"}
      </p>
      <p>
        <strong>Estado actual:</strong> <em>{order.status}</em>
      </p>
      {socketReady ? (
        <p className="text-success">WebSocket conectado.</p>
      ) : (
        <p className="text-warning">Conectando vía WebSocket…</p>
      )}
    </div>
  );
}

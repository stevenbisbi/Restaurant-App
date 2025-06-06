// src/pages/OrderStatusPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useOrderSocket } from "../../../hooks/useOrderSocket";
import axiosClient from "../../../api/axiosClient"; // tu instancia Axios configurada

export function OrderStatusPage() {
  const { orderId } = useParams();
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

  const handleClickChangeStatus = (newState) => {
    sendStatus(newState);
    // Actualización optimista del estado
    setOrder((prevOrder) => ({ ...prevOrder, status: newState }));
  };

  if (loading) {
    return <p>Cargando orden…</p>;
  }
  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="container py-4">
      <h2>Detalle de Orden #{order.table}</h2>
      <p>
        <strong>Id:</strong> {orderId}
      </p>
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

      <div className="mt-4">
        <button
          className="btn btn-primary me-2"
          onClick={() => handleClickChangeStatus("Preparando")}
        >
          Poner en “En Preparación”
        </button>
        <button
          className="btn btn-success me-2"
          onClick={() => handleClickChangeStatus("Lista")}
        >
          Poner en “Listo para Entregar”
        </button>
        <button
          className="btn btn-danger"
          onClick={() => handleClickChangeStatus("En espera")}
        >
          En espera
        </button>
      </div>
    </div>
  );
}

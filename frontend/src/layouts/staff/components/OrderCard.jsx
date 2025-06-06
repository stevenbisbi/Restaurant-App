// components/OrderCard.jsx
import { useOrderDetail } from "../../../hooks/useOrderDetail";

export function OrderCard({ orderId }) {
  const { order, loading, error, changeStatus, socketReady } =
    useOrderDetail(orderId);

  if (loading) return <p>Cargando orden…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="card m-3 p-3">
      <h5>Orden #{order.id}</h5>
      <p>
        <strong>Estado:</strong> {order.status}
      </p>
      <p>
        <strong>Cliente:</strong> {order.client || "Anónimo"}
      </p>
      <p>
        <strong>Camarero:</strong> {order.waiter || "No asignado"}
      </p>
      <p>
        {socketReady
          ? "🟢 Conectado via WebSocket"
          : "🟡 Conectando vía WebSocket…"}
      </p>

      <div className="btn-group mt-2">
        <button
          onClick={() => changeStatus("Preparando")}
          className="btn btn-primary"
        >
          Preparando
        </button>
        <button
          onClick={() => changeStatus("Listo para Entregar")}
          className="btn btn-success"
        >
          Listo para Entregar
        </button>
        <button
          onClick={() => sendStatus("En espera")}
          className="btn btn-danger"
        >
          En espera
        </button>
      </div>
    </div>
  );
}

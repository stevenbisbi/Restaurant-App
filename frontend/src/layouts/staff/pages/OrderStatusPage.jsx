import { useFetch } from "../../../hooks/useFetch";
import { getAllOrders } from "../../../api/orderApi";
import { OrderCard } from "../components/OrderCard";

export function OrderStatusPage() {
  const { data: orders, loading, error } = useFetch(getAllOrders);

  if (loading) return <p>Cargando órdenes…</p>;
  if (error) return <p>Error al cargar: {error}</p>;

  return (
    <div className="container">
      <h2>Órdenes Activas</h2>
      {orders.map((order) => (
        <OrderCard key={order.id} orderId={order.id} />
      ))}
    </div>
  );
}

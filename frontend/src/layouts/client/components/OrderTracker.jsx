// OrderTracker.jsx
import { useEffect, useState } from "react";
import io from "socket.io-client";

const OrderTracker = ({ orderId, token }) => {
  const [status, setStatus] = useState("Procesando...");

  useEffect(() => {
    const socket = io("ws://localhost:8000", {
      path: `/ws/orders/${orderId}/`,
      query: { token: token },
    });

    socket.on("status_update", (data) => {
      setStatus(data.status);
    });

    return () => socket.disconnect();
  }, [orderId, token]);

  return (
    <div>
      <h2>Estado del pedido: {status}</h2>
    </div>
  );
};

export default OrderTracker;

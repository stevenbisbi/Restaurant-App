// src/hooks/useOrderDetails.js
import { useEffect, useState } from "react";
import { useOrderSocket } from "./useOrderSocket";
import axiosClient from "../api/axiosClient";

export function useOrderDetail(orderId) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { socketReady, sendStatus } = useOrderSocket(orderId, (newStatus) => {
    setOrder((prev) => ({ ...prev, status: newStatus }));
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get(`/orders/order/${orderId}/`);
        setOrder(response.data);
      } catch (err) {
        console.error("Error al obtener orden:", err);
        setError("No se pudo cargar la información de la orden.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  const changeStatus = (newStatus) => {
    sendStatus(newStatus);
    setOrder((prev) => ({ ...prev, status: newStatus })); // Optimista
  };

  return {
    order,
    loading,
    error,
    socketReady,
    changeStatus,
  };
}

import { useState, useEffect } from "react";
import { getAllMenuItems } from "../api/menu/menuItemApi";

export function useMenuItem() {
  const [MenuItems, setMenuItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false); // Nuevo estado para recargas

  useEffect(() => {
    async function fetchMenuItem() {
      try {
        setLoading(true);
        const response = await getAllMenuItems();
        setMenuItem(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMenuItem();
  }, [reload]); // Agrega "reload" como dependencia

  // Función para forzar recarga
  const triggerReload = () => setReload((prev) => !prev);

  return { MenuItems, loading, error, triggerReload }; // Devuelve la función
}

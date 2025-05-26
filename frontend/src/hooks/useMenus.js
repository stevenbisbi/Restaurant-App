import { useState, useEffect } from "react";
import { getAllMenus } from "../api/menu/menuApi";

export function useMenus() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false); // Nuevo estado para recargas

  useEffect(() => {
    async function fetchMenus() {
      try {
        setLoading(true);
        const response = await getAllMenus();
        setMenus(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMenus();
  }, [reload]); // Agrega "reload" como dependencia

  // Función para forzar recarga
  const triggerReload = () => setReload((prev) => !prev);

  return { menus, loading, error, triggerReload }; // Devuelve la función
}

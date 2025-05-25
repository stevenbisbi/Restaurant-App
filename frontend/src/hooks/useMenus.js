import { useState, useEffect } from "react";
import { getAllMenus } from "../api/menuApi";

export function useMenus() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMenus() {
      try {
        setLoading(true);
        const response = await getAllMenus();
        console.log("Respuesta de la API:", response); // <-- Agrega esto
        setMenus(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMenus();
  }, []);

  return { menus, loading, error };
}

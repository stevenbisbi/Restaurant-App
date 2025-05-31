import { useState, useEffect } from "react";
import { getAllTables } from "../api/tablesApi";

export function useTables() {
  const [tables, settables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false); // Nuevo estado para recargas

  useEffect(() => {
    async function fetchtables() {
      try {
        setLoading(true);
        const response = await getAllTables();
        settables(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchtables();
  }, [reload]); // Agrega "reload" como dependencia

  // Función para forzar recarga
  const triggerReload = () => setReload((prev) => !prev);

  return { tables, loading, error, triggerReload }; // Devuelve la función
}

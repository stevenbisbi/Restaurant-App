import { useEffect, useState } from "react";

export function useFetch(fetchFunction) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchFunction();
        setData(response.data); // meals porque la API devuelve un objeto con una propiedad meals, pero cuando este todo creado en el backend, se puede cambiar a un array directamente
        // setData(response.data); // si la API devuelve un array directamente
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchFunction]);

  return { data, loading, error };
}

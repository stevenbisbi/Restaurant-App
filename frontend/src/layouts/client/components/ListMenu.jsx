import { useState, useEffect } from "react";
import { MenuCard } from "../components/MenuCard";
import { ModalMenuCard } from "../components/ModalMenuCard";

export function ListMenu({ api }) {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedObject, setSelectedObject] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await api;
      const sortedData = data.data.sort((a, b) => a.id - b.id);
      setMenu(sortedData);
      setLoading(false);
    }
    fetchData();
  }, [api]);

  return (
    <div className="container-fluid">
      <div className="row d-flex gap-3 justify-content-center">
        {loading ? (
          <div className="d-flex justify-content-center w-100 my-5">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : (
          currentItems.map((object) => (
            <MenuCard
              key={object.id}
              object={object}
              setSelectedObject={setSelectedObject}
            />
          ))
        )}
      </div>
      {/* Renderiza el modal fuera del mapeo para evitar múltiples instancias */}
      <ModalMenuCard selectedObject={selectedObject} />
    </div>
  );
}

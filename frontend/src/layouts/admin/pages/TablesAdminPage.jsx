import { useEffect, useState } from "react";
import { Spinner, Alert } from "react-bootstrap";
import {
  getAllTables,
  getTable,
  createTable,
  deleteTable,
  updateTable,
} from "../../../api/tablesApi";
import { HeaderAdmin } from "./HeaderAdmin";
import { useTables } from "../../../hooks/useTables";
import { useNavigate } from "react-router-dom";

export function TablesAdminPage() {
  const { tables, loading, error, triggerReload } = useTables();
  const navigate = useNavigate();
  const [selectedTableId, setSelectedTableId] = useState(null);

  if (loading)
    return (
      <div className="text-center m-5">
        <Spinner animation="border" role="status">
          Cargando...{" "}
        </Spinner>
      </div>
    );
  if (error)
    return (
      <div className="text-center m-5">
        <Alert variant="danger">{error}</Alert>
      </div>
    );

  const handleDeleteClick = (id) => {
    setSelectedTableId(id);
  };

  const handleConfirmDelete = async () => {
    if (selectedTableId) {
      await deleteMenu(selectedTableId);
      setSelectedTableId(null);
      triggerReload();
      navigate("/admin/menu");
    }
  };

  return (
    <>
      <HeaderAdmin
        title="Mesas"
        btnTitle="Crear nueva Mesa"
        endPoint="/admin/tables/create"
      />
      <div className="container mt-4">
        <p>Aquí se gestionarán las mesas del restaurante.</p>
        {/* Aquí puedes agregar más lógica para mostrar las mesas, formularios, etc. */}
      </div>
    </>
  );
}

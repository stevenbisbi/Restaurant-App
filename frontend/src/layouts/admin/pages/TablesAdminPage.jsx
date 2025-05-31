import { useState } from "react";
import { Spinner, Alert } from "react-bootstrap";
import { deleteTable } from "../../../api/tablesApi";
import { HeaderAdmin } from "./HeaderAdmin";
import { useFetch } from "../../../hooks/useFetch";
import { useNavigate, Link } from "react-router-dom";
import { ModalDelete } from "../components/ModalDelete";
import { getAllTables } from "../../../api/tablesApi";

export function TablesAdminPage() {
  const { data, loading, error, triggerReload } = useFetch(getAllTables);
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
      await deleteTable(selectedTableId);
      setSelectedTableId(null);
      triggerReload();
      navigate("/admin/tables");
    }
  };

  return (
    <>
      <HeaderAdmin
        title="Mesas"
        btnTitle="Crear nueva Mesa"
        endPoint="/admin/tables/create"
      />
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Activo</th>
              <th>Numero</th>
              <th>Ubicacion</th>
              <th>Capacidad</th>
              <th>Estado</th>
              <th>Restaurante</th>
              <th>Creado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((table) => (
              <tr key={table.id}>
                <td className="text-center">{table.is_active ? "✅" : "❌"}</td>
                <td>{table.number}</td>
                <td>{table.capacity}</td>
                <td>{table.location}</td>
                <td>{table.status}</td>
                <td>{table.restaurant || "Sin asignar"}</td>
                <td>{new Date(table.created_at).toLocaleDateString()}</td>
                <td>
                  <Link
                    to={`/admin/tables/edit/${table.id}`}
                    className="btn btn-sm btn-outline-secondary mx-1"
                  >
                    Editar
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger mx-1"
                    data-bs-toggle="modal"
                    data-bs-target="#DeleteModal"
                    onClick={() => handleDeleteClick(table.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModalDelete onConfirm={handleConfirmDelete} />
    </>
  );
}

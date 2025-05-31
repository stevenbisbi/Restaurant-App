import { useFetch } from "../../../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { HeaderAdmin } from "./HeaderAdmin";
import { deleteMenu } from "../../../api/menu/menuApi";
import { ModalDelete } from "../components/ModalDelete";
import { getAllMenus } from "../../../api/menu/menuApi";

export function MenuAdminPage() {
  const { data, loading, error, triggerReload } = useFetch(getAllMenus);
  const navigate = useNavigate();
  const [selectedMenuId, setSelectedMenuId] = useState(null);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los menús</p>;

  const handleDeleteClick = (id) => {
    setSelectedMenuId(id);
  };

  const handleConfirmDelete = async () => {
    if (selectedMenuId) {
      await deleteMenu(selectedMenuId);
      setSelectedMenuId(null);
      triggerReload();
      navigate("/admin/menu");
    }
  };

  return (
    <div>
      <HeaderAdmin
        title="Menús"
        btnTitle="Crear nuevo Menú"
        endPoint="/admin/menu/create"
      />

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Activo</th>
              <th>Nombre</th>
              <th>Restaurante</th>
              <th>Creado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((menu) => (
              <tr key={menu.id}>
                <td className="text-center">{menu.is_active ? "✅" : "❌"}</td>
                <td>{menu.name}</td>
                <td>{menu.restaurant_details?.name || "Sin asignar"}</td>
                <td>{new Date(menu.created_at).toLocaleDateString()}</td>
                <td>
                  <Link
                    to={`/admin/menu/edit/${menu.id}`}
                    className="btn btn-sm btn-outline-secondary mx-1"
                  >
                    Editar
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger mx-1"
                    data-bs-toggle="modal"
                    data-bs-target="#DeleteModal"
                    onClick={() => handleDeleteClick(menu.id)}
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
    </div>
  );
}

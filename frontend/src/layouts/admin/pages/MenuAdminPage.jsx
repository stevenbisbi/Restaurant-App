import { useFetch } from "../../../hooks/useFetch";
import { Button } from "react-bootstrap";
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
            <tr className="text-center">
              <th>Activo</th>
              <th>Nombre</th>
              <th>Restaurante</th>
              <th>Creado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data.map((menu) => (
              <tr key={menu.id}>
                <td className="text-center">{menu.is_active ? "✅" : "❌"}</td>
                <td>{menu.name}</td>
                <td>{menu.restaurant_details?.name || "Sin asignar"}</td>
                <td>{new Date(menu.created_at).toLocaleDateString()}</td>
                <td>
                  <Button
                    variant="outline-secondary"
                    onClick={() => navigate(`/admin/menu/edit/${menu.id}`)}
                    className="me-2"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => setSelectedMenuId(menu.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModalDelete
        show={selectedMenuId !== null}
        onHide={() => setSelectedMenuId(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

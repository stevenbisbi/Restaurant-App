import { HeaderAdmin } from "./HeaderAdmin";
import { useFetch } from "../../../hooks/useFetch";
import { getAllOrders } from "../../../api/orderApi";
import { deleteOrder } from "../../../api/orderApi";
import { ModalDelete } from "../components/ModalDelete";

export function OrderAdminPage() {
  const { data, orders, loading, error } = useFetch(getAllOrders);

  const handleConfirmDelete = async () => {
    if (selectedItemId) {
      await deleteOrder(selectedItemId);
      setSelectedItemId(null);
      triggerReload();
      navigate("/admin/items");
    }
  };
  return (
    <div>
      <HeaderAdmin title="Order Management" />
      <div className="container">
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
                  <td className="text-center">
                    {menu.is_active ? "✅" : "❌"}
                  </td>
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
    </div>
  );
}

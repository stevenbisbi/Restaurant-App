import { HeaderAdmin } from "./HeaderAdmin";
import { Link } from "react-router-dom";
import { Spinner, Alert } from "react-bootstrap";
import { useFetch } from "../../../hooks/useFetch";
import { getAllOrders } from "../../../api/orderApi";
import { deleteOrder } from "../../../api/orderApi";
import { ModalDelete } from "../components/ModalDelete";

export function OrderAdminPage() {
  const {
    data,
    loading,
    error,
    triggerReload,
    selectedDataId,
    setSelectedDataId,
  } = useFetch(getAllOrders);
  console.log("data?", data);

  const handleConfirmDelete = async () => {
    if (selectedDataId) {
      await deleteOrder(selectedDataId);
      setSelectedDataId(null);
      triggerReload();
      navigate("/admin/items");
    }
  };

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

  return (
    <div>
      <HeaderAdmin title="Order Management" />
      <div className="container">
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Cliente</th>
                <th>Mesa</th>
                <th>Mesero</th>
                <th>Estado</th>
                <th>Total</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {/* {data.map((order) => (
                <tr key={order.id}>
                  <td className="text-center">
                    {order.customer ? "✅" : "❌"}
                  </td>
                  <td>{order.table}</td>
                  <td>{order.status}</td>
                  <td>{new Date(order.created_at).toLocaleDateString()}</td>
                  <td>
                    <Link
                      to={`/admin/order/edit/${order.id}`}
                      className="btn btn-sm btn-outline-secondary mx-1"
                    >
                      Editar
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-danger mx-1"
                      data-bs-toggle="modal"
                      data-bs-target="#DeleteModal"
                      onClick={() => handleDeleteClick(order.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
        <ModalDelete onConfirm={handleConfirmDelete} />
      </div>
    </div>
  );
}

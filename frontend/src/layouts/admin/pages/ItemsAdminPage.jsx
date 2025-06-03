import { useState } from "react";
import { Card, Button, Spinner, Alert } from "react-bootstrap";
import { HeaderAdmin } from "./HeaderAdmin";
import { useNavigate, Link } from "react-router-dom";
import { ModalDelete } from "../components/ModalDelete";
import { deleteMenuItem } from "../../../api/menu/menuItemApi";
import { getAllMenuItems } from "../../../api/menu/menuItemApi";
import { useFetch } from "../../../hooks/useFetch";

export function ItemsAdminPage() {
  const { data, loading, error, triggerReload } = useFetch(getAllMenuItems);
  const navigate = useNavigate();
  const [selectedItemId, setSelectedItemId] = useState(null);

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

  const handleConfirmDelete = async () => {
    if (selectedItemId) {
      await deleteMenuItem(selectedItemId);
      setSelectedItemId(null);
      triggerReload();
      navigate("/admin/items");
    }
  };

  return (
    <div className="container mt-4">
      <HeaderAdmin
        title="Productos"
        btnTitle="Crear nuevo Producto"
        endPoint="/admin/items/create"
      />

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {data.map((item) => (
          <div className="col" key={item.id}>
            <Card className="h-100 shadow-sm">
              {item.image && (
                <Card.Img
                  variant="top"
                  src={item.image}
                  alt={item.image}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <Card.Body>
                <Card.Title>
                  {" "}
                  <h3>{item.name}</h3>
                </Card.Title>
                <Card.Text>
                  <strong>Categoría:</strong> {item.category} <br />
                  <strong>Descripcion:</strong> {item.description} <br />
                  <strong>Precio:</strong> ${" "}
                  {item.price.toLocaleString("es-CO")} <br />
                  <strong>Destacado:</strong> {item.is_featured ? "SÍ" : "NO"}{" "}
                  <br />
                  <strong>En Promoción:</strong>{" "}
                  {item.is_promotion ? "SÍ" : "NO"} <br />
                  <strong>Vegetariano:</strong>{" "}
                  {item.is_vegetarian ? "SÍ" : "NO"} <br />
                  <strong>Estado:</strong>{" "}
                  {item.is_available ? "Activo" : "Inactivo"} <br />
                  <strong>Actualizado:</strong>{" "}
                  {new Date(item.updated_at).toLocaleDateString()} <br />
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button
                    variant="outline-secondary"
                    onClick={() => navigate(`/admin/items/edit/${item.id}`)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => setSelectedItemId(item.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      <ModalDelete
        show={selectedItemId !== null}
        onHide={() => setSelectedItemId(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

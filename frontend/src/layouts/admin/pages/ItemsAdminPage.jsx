import { useState } from "react";
import { Card, Button, Spinner, Alert } from "react-bootstrap";
import { HeaderAdmin } from "./HeaderAdmin";
import { useNavigate, Link } from "react-router-dom";
import { ModalDelete } from "../components/ModalDelete";
import { deleteMenuItem } from "../../../api/menu/menuItemApi";
import { useMenuItem } from "../../../hooks/useMenuItem";

export function ItemsAdminPage() {
  const { MenuItems, loading, error, triggerReload } = useMenuItem();
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

  const handleDeleteClick = (id) => {
    setSelectedItemId(id);
  };

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
        {MenuItems.map((item) => (
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
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                  <strong>Categoría:</strong> {item.category} <br />
                  <strong>Precio:</strong> ${item.price} <br />
                  {item.is_vegetarian && (
                    <span>
                      🥦 Vegetariano
                      <br />
                    </span>
                  )}
                  {item.is_promotion && (
                    <span>
                      🔥 En Promoción
                      <br />
                    </span>
                  )}
                  {item.is_featured && (
                    <span>
                      ⭐ Destacado
                      <br />
                    </span>
                  )}
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
                    data-bs-toggle="modal"
                    data-bs-target="#DeleteModal"
                    onClick={() => handleDeleteClick(item.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      <ModalDelete onConfirm={handleConfirmDelete} />
    </div>
  );
}

import { useEffect, useState } from "react";
import { Card, Button, Spinner, Alert, Modal } from "react-bootstrap";
import { getAllMenuItems, deleteMenuItem } from "../../../api/menu/menuItemApi";
import { useNavigate } from "react-router-dom";

export function ItemsAdminPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await getAllMenuItems();
      setItems(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error al cargar los ítems del menú.");
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMenuItem(selectedItem.id);
      setItems(items.filter((item) => item.id !== selectedItem.id));
      setShowModal(false);
    } catch (err) {
      alert("Error al eliminar el ítem.");
    }
  };

  if (loading)
    return (
      <div className="text-center m-5">
        <Spinner animation="border" role="status" />
      </div>
    );

  if (error)
    return (
      <div className="text-center m-5">
        <Alert variant="danger">{error}</Alert>
      </div>
    );

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Administrar Menú</h2>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {items.map((item) => (
          <div className="col" key={item.id}>
            <Card className="h-100 shadow-sm">
              {item.image_url && (
                <Card.Img
                  variant="top"
                  src={item.image_url}
                  alt={item.name}
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
                    variant="warning"
                    onClick={() => navigate(`/admin/menu/edit/${item.id}`)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setSelectedItem(item);
                      setShowModal(true);
                    }}
                  >
                    Eliminar
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Modal de Confirmación de Eliminación */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Eliminar <strong>{selectedItem?.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

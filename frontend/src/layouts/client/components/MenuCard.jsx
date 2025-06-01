import { Card } from "react-bootstrap";
import { useFetch } from "../../../hooks/useFetch";
import { getAllMenuItems } from "../../../api/menu/menuItemApi";

export function MenuCard({ item, onSelect }) {
  const { data, loading, error } = useFetch(getAllMenuItems);

  if (loading) return <p>Cargando menús...</p>;
  if (error) return <p>Error cargando menús 😢</p>;
  return (
    <Card
      className="p-2 mx-2 position-relative"
      style={{ cursor: "pointer", width: "16rem" }}
      onClick={() => onSelect(item)}
    >
      {item.is_promotion ? (
        <span
          style={{ height: "2rem" }}
          className="position-absolute top-1 end-0 translate-middle-y badge rounded-pill bg-danger d-flex align-items-center"
        >
          <span className="bg-light rounded-circle py-1 me-1">💯 </span>
          ¡Promoción!
        </span>
      ) : (
        item.is_featured && (
          <span
            style={{ height: "2rem" }}
            className="position-absolute top-1 end-0 translate-middle-y badge rounded-pill bg-warning text-dark d-flex align-items-center"
          >
            <span className="bg-light rounded-circle py-1 me-1">⭐ </span>{" "}
            ¡Destacado!
          </span>
        )
      )}
      <Card.Img
        alt={item.image}
        variant="top"
        src={item.image}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>
          <strong>Precio:</strong> $ {item.price.toLocaleString("es-CO")}
          <br />
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

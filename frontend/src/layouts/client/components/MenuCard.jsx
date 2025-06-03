import { Card } from "react-bootstrap";
import { useFetch } from "../../../hooks/useFetch";
import { getAllMenuItems } from "../../../api/menu/menuItemApi";

export function MenuCard({ item, onSelect }) {
  const { loading, error } = useFetch(getAllMenuItems);

  if (loading) return <p>Cargando platos...</p>;
  if (error) return <p>Error cargando Platos 😢</p>;
  return (
    <Card
      className="p-1 position-relative h-100"
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
        <Card.Title className="w-100 text-center">{item.name}</Card.Title>
        <Card.Text className="text-center">
          <span className="text-secondary">{item.description}</span>
        </Card.Text>
        <br />
        <div className="d-flex justify-content-center align-items-center">
          {item.is_promotion ? (
            <div>
              <s>$ {item.price.toLocaleString("es-CO")}</s>
              <br />
              <span className="text-danger fs-5">
                $ {(item.price * 0.75).toLocaleString("es-CO")}
              </span>
            </div>
          ) : (
            <span>${item.price.toLocaleString("es-CO")}</span>
          )}
        </div>

        <br />
      </Card.Body>
    </Card>
  );
}

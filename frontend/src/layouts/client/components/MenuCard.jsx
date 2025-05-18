import { Card } from "react-bootstrap";

export function MenuCard({ meal, onSelect }) {
  return (
    <Card
      className="p-2 mx-2 position-relative"
      style={{ cursor: "pointer", width: "16rem" }}
      onClick={() => onSelect(meal)}
    >
      {comida.promocion && (
        <span className="badge">¡Promoción!</span>
      )}
      <Card.Img variant="top" src={meal.strMealThumb} />
      <Card.Body>
        <Card.Title>{meal.strMeal}</Card.Title>
        <Card.Text>
          <strong>Precio:</strong> {Math.floor(Math.random() * 10000)}$
          <br />
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

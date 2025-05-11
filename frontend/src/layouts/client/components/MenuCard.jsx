import { Card, Button } from "react-bootstrap";

export function MenuCard({ meal, onSelect }) {
  return (
    <Card
      className="px-2 mx-2"
      style={{ cursor: "pointer", width: "16rem" }}
      onClick={() => onSelect(meal)}
    >
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

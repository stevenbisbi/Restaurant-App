import { Card } from "react-bootstrap";

export function MenuCard({ meal, setSelectedMeal }) {
  return (
    <Card
      className="h-100"
      onClick={() => setSelectedMeal(meal)}
      style={{ cursor: "pointer" }}
    >
      <Card.Img
        variant="top"
        src={meal.strMealThumb}
        alt={meal.strMeal}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{meal.strMeal}</Card.Title>
        <Card.Text className="text-muted">
          {meal.strCategory} - {meal.strArea}
        </Card.Text>
        <Card.Text>{meal.strInstructions.substring(0, 100)}...</Card.Text>
        <Card.Text className="text-muted">
          Precio: ${Math.floor(Math.random() * (100 - 10 + 1)) * 1000}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

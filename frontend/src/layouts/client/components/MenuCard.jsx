import { Card } from "react-bootstrap";

export function MenuCard({ meal, onSelect }) {
  return (
    <Card
    className="p-2 mx-2 position-relative"
    style={{ cursor: "pointer", width: "16rem" }}
    onClick={() => onSelect(meal)}
    >
      {/* { menuItem.is_promotion ? (
        <span style={{ height: "2rem"}} className="position-absolute top-1 end-0 translate-middle-y badge rounded-pill bg-danger d-flex align-items-center"><span className="bg-light rounded-circle py-1 me-1">💯 </span>¡Promoción!</span>
      ):  (menuItem.is_featured && (
        <span style={{ height: "2rem"}} className="position-absolute top-1 end-0 translate-middle-y badge rounded-pill bg-warning text-dark d-flex align-items-center"><span className="bg-light rounded-circle py-1 me-1">⭐ </span> ¡Destacado!</span>
      ))} */}
      <Card.Img alt={meal.strMeal} variant="top" src={meal.strMealThumb} />
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

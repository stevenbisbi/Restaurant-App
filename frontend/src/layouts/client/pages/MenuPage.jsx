import { Spinner, Alert } from "react-bootstrap";
import { MenuCard } from "../components/MenuCard";
import { ModalMenuCard } from "../components/ModalMenuCard";
import { useState } from "react";
import { useFetch } from "../../../hooks/useFetch";

export function MenuPage() {
  const [selectedMeal, setSelectedMeal] = useState(null);

  const url = "https://www.themealdb.com/api/json/v1/1/search.php?f=a";

  const { data, loading, error } = useFetch(url);
  if (loading) {
    return (
      <div className="text-center  m-5">
        <Spinner
          animation="grow"
          role="status"
          variant="warning"
          style={{ width: 80, height: 80 }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center m-5">
        <Alert variant="danger">{error}</Alert>;
      </div>
    );
  }

  return (
    <>
      <div className="container mt-4">
        <h1 className="text-center mb-4">
          <i>Lo Mejor Aquí</i>
        </h1>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {data.map((meal) => (
            <MenuCard
              key={meal.idMeal}
              meal={meal}
              onSelect={setSelectedMeal}
            />
          ))}
        </div>

        <ModalMenuCard
          meal={selectedMeal}
          show={!!selectedMeal}
          onHide={() => setSelectedMeal(null)}
        />
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner, Alert } from "react-bootstrap";
import { MenuCard } from "../components/MenuCard";
import { ModalMenuCard } from "../components/ModalMenuCard";

export function MenuPage() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/search.php?f=a"
        );
        setMeals(response.data.meals || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <>
      <div className="container mt-4">
      <h1 className="text-center mb-4">
        <i>Lo Mejor Aquí</i>
      </h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {meals.map((meal) => (
          <MenuCard key={meal.idMeal} meal={meal} onSelect={setSelectedMeal} />
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

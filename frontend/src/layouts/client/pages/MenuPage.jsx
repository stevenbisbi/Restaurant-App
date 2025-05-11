import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col, Spinner, Alert } from "react-bootstrap";
import { MenuCard } from "../components/MenuCard";

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
        setMeals(response.data.meals);
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
        <Row xs={1} md={2} lg={3} className="g-4">
          {meals.map((meal) => (
            <Col key={meal.idMeal}>
              <MenuCard meal={meal} setSelectedMeal={setSelectedMeal} />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

import { Spinner, Alert } from "react-bootstrap";
import { MenuCard } from "../components/MenuCard";
import { ModalMenuCard } from "../components/modal/ModalMenuCard";
import { useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { getAllMenuItems } from "../../../api/menu/menuItemApi";

export function MenuPage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const { data, loading, error } = useFetch(getAllMenuItems);
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
        <div className="d-flex justify-content-center">
          <div className="row g-3">
            {data.map((item) => {
              if (!item.is_available) return null;
              return (
                <div className="col-auto mx-auto" key={item.id}>
                  <MenuCard item={item} onSelect={setSelectedItem} />
                </div>
              );
            })}
          </div>
        </div>

        <ModalMenuCard
          item={selectedItem}
          show={!!selectedItem}
          onHide={() => setSelectedItem(null)}
          onAddToCart={addToCart}
        />
      </div>
    </>
  );
}

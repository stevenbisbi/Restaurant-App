import { Spinner, Alert } from "react-bootstrap";
import { MenuCard } from "../components/MenuCard";
import { ModalMenuCard } from "../components/ModalMenuCard";
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
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {data.map((item) => {
            if (!item.is_available) return null;
            return (
              <MenuCard key={item.id} item={item} onSelect={setSelectedItem} />
            );
          })}
        </div>

        <ModalMenuCard
          item={selectedItem}
          show={!!selectedItem}
          onHide={() => setSelectedItem(null)}
          onAddToCart={addToCart}
        />
      </div>
      <div className="mt-4">
        <h3>Carrito</h3>
        {cart.length === 0 ? (
          <p className="text-muted">Carrito vacío</p>
        ) : (
          <ul className="list-group">
            {cart.map((item, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between"
              >
                <div>
                  <strong>{item.name}</strong> x{item.quantity}
                  <br />
                  Opciones: {item.selectedOptions?.join(", ") || "Ninguna"}
                </div>
                <span>${item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

import { useState } from "react";

import { MenuPage } from "../../client/pages/MenuPage";
import { Navigation } from "../components/Navigation";

export function HomePage() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Función para agregar un item al carrito
  const addToCart = (item) => {
    // Aquí puedes mejorar la lógica para que no se dupliquen items y sume cantidades
    setCart((prev) => [...prev, item]);
  };
  return (
    <>
      <Navigation
        show={showCart}
        handleShow={() => setShowCart(true)}
        handleClose={() => setShowCart(false)}
      />
      <MenuPage addToCart={addToCart} />
    </>
  );
}

export function Footer() {
  return (
    <footer
      style={{
        display: "grid",
        minHeight: "100dvh",
        gridTemplateRows: "auto 1fr auto",
        padding: "20px",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div className="container">
        <h1 className="text-center">RestaurantOS</h1>
        <div className="d-flex justify-content-center">
          <p className="mx-3">&copy; 2025 Parcha2.</p>
          <p className="mx-3">Todos los derechos reservados. </p>
          <p className="mx-3">Michael Steven Sanchez</p>
        </div>
      </div>
    </footer>
  );
}

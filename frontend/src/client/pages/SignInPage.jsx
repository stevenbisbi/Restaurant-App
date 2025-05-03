import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const images = import.meta.glob("/src/assets/img/*.{jpg,png,jpeg}", {
  eager: true,
});
const backgroundImages = Object.values(images).map((img) => img.default);

export const SignInPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(() =>
    Math.floor(Math.random() * backgroundImages.length)
  );
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // empieza a ocultar

      // Espera a que se termine de ocultar (500ms) y luego cambia imagen
      const timeout = setTimeout(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % backgroundImages.length
        );
        setFade(true); // vuelve a mostrar
      }, 600); // un poco más largo que la animación CSS (500ms)

      return () => clearTimeout(timeout);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const currentImage = backgroundImages[currentImageIndex];

  return (
    <Container fluid className="p-0 vh-100">
      <Row className="g-0 h-100">
        {/* Columna izquierda */}
        <Col md={7} className="position-relative p-0 overflow-hidden">
          {/* Fondo con animación */}
          <div
            className={`background-fade ${fade ? "fade-in" : "fade-out"}`}
            style={{ backgroundImage: `url(${currentImage})` }}
          ></div>

          {/* Capa de oscurecimiento */}
          <div className="overlay"></div>

          {/* Contenido por encima */}
          <div className="position-relative h-100 d-flex flex-column justify-content-between p-5 text-white content">
            <div>
              <div className="bg-warning text-danger rounded-pill d-inline-block px-4 py-2 mb-4">
                <strong>¡Fresco todos los días!</strong>
              </div>
              <h1 className="display-4 fw-bold mb-3">Ingredientes Premium</h1>
              <p className="fs-5">
                Ingredientes frescos de granja en cada plato que servimos
              </p>
            </div>
          </div>
        </Col>

        {/* Formulario */}
        <Col
          md={5}
          className="d-flex align-items-center justify-content-center bg-white"
        >
          <div className="w-100 p-5" style={{ maxWidth: "500px" }}>
            <div className="text-end mb-5">
              <h2 className="text-danger fw-bold text-center">Parcha2</h2>
            </div>

            <h1 className="display-6 fw-bold mb-3">¡Bienvenido de nuevo!</h1>
            <p className="text-secondary mb-4">Por favor ingresa tus datos</p>

            <Form>
              <Form.Group className="mb-4" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingresa tu email"
                  className="py-2 px-3 border-2"
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  className="py-2 px-3 border-2"
                />
              </Form.Group>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <Form.Check
                  type="checkbox"
                  id="rememberMe"
                  label="Recordarme"
                  className="text-secondary"
                />
                <Button variant="link" className="text-danger p-0">
                  ¿Olvidaste tu contraseña?
                </Button>
              </div>

              <Button
                variant="danger"
                size="lg"
                className="w-100 py-2 fw-bold text-white"
              >
                Iniciar sesión
              </Button>

              <p className="text-center mt-4 text-secondary">
                ¿No tienes una cuenta?{" "}
                <Button
                  variant="link"
                  className="text-danger p-0"
                  href="/register"
                >
                  Regístrate
                </Button>
              </p>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

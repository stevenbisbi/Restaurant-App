import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import fondo from "../../assets/img/hamburgesa4.jpg";

export const SignIn = () => {
  return (
    <Container fluid className="p-0 vh-100">
      <Row className="g-0 h-100">
        {/* Columna izquierda con imagen de fondo */}
        <Col
          md={7} // Antes era 10, así el formulario tiene más espacio
          className="position-relative"
          style={{
            backgroundImage: `url(${fondo})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" />

          <div className="position-relative h-100 d-flex flex-column justify-content-between p-5 text-white">
            {/* Encabezado */}
            <div>
              <div className="bg-warning text-danger rounded-pill d-inline-block px-4 py-2 mb-4">
                <strong>¡Fresco todos los días!</strong>
              </div>
              <h1 className="display-4 fw-bold mb-3 ">Ingredientes Premium</h1>
              <p className="fs-5 ">
                Ingredientes frescos de granja en cada plato que servimos
              </p>
            </div>
          </div>
        </Col>

        {/* Columna derecha con formulario */}
        <Col
          md={5} // Antes era 2, así tiene más espacio
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
                <Button variant="link" className="text-danger p-0">
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

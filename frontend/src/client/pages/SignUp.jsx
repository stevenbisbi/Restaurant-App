import React from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import fondo from "../../assets/img/hamburgesa7.jpg";

export const SignUp = () => {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Requerido"),
    email: Yup.string().email("Email inválido").required("Requerido"),
    password: Yup.string().min(8, "Mínimo 8 caracteres").required("Requerido"),
    first_name: Yup.string().required("Requerido"),
    last_name: Yup.string().required("Requerido"),
    phone_number: Yup.string().matches(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
      "Teléfono inválido"
    ),
  });

  return (
    <Container fluid className="p-0 vh-100">
      <Row className="g-0 h-100">
        {/* Columna izquierda con imagen (usar el mismo componente que en login) */}
        <Col
          md={6} // Antes era 10, así el formulario tiene más espacio
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
              <h1 className="display-4 fw-bold mb-3 ">Trato Especial</h1>
              <p className="fs-5 ">
                Pide y paga en el restaurante, ¡sin esperas!<br></br>
                <strong>¡Parcha2!</strong>
              </p>
            </div>
          </div>
        </Col>
        {/* Columna derecha con formulario de registro */}
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center bg-light"
        >
          <div className="w-100 p-4" style={{ maxWidth: "500px" }}>
            <h2 className="text-danger mb-4">Registro en Parcha2</h2>

            <Formik
              initialValues={{
                username: "",
                email: "",
                password: "",
                first_name: "",
                last_name: "",
                phone_number: "",
                dietary_restrictions: "",
                allergies: "",
                preferences: [],
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                // Lógica para enviar a tu API Django
                console.log("Valores del formulario:", values);
                setSubmitting(false);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                isSubmitting,
              }) => (
                <Form onSubmit={handleSubmit}>
                  {/* Sección de Información de Cuenta */}
                  <div className="mb-4">
                    <h5 className="text-secondary mb-3">
                      Información de Cuenta
                    </h5>

                    <Form.Group className="mb-3">
                      <Form.Label>Nombre de usuario*</Form.Label>
                      <Form.Control
                        name="username"
                        type="text"
                        onChange={handleChange}
                        isInvalid={touched.username && !!errors.username}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.username}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Email*</Form.Label>
                      <Form.Control
                        name="email"
                        type="email"
                        onChange={handleChange}
                        isInvalid={touched.email && !!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Contraseña*</Form.Label>
                      <Form.Control
                        name="password"
                        type="password"
                        onChange={handleChange}
                        isInvalid={touched.password && !!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>

                  {/* Sección de Información Personal */}
                  <div className="mb-4">
                    <h5 className="text-secondary mb-3">
                      Información Personal
                    </h5>

                    <Form.Group className="mb-3">
                      <Form.Label>Nombre*</Form.Label>
                      <Form.Control
                        name="first_name"
                        type="text"
                        onChange={handleChange}
                        isInvalid={touched.first_name && !!errors.first_name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.first_name}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Apellido*</Form.Label>
                      <Form.Control
                        name="last_name"
                        type="text"
                        onChange={handleChange}
                        isInvalid={touched.last_name && !!errors.last_name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.last_name}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Teléfono</Form.Label>
                      <Form.Control
                        name="phone_number"
                        type="tel"
                        placeholder="+34 123 456 789"
                        onChange={handleChange}
                        isInvalid={
                          touched.phone_number && !!errors.phone_number
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.phone_number}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>

                  <Button
                    variant="danger"
                    type="submit"
                    className="w-100 py-2 fw-bold text-white"
                    disabled={isSubmitting}
                  >
                    Registrarse
                  </Button>

                  <div className="text-center mt-3">
                    <p className="text-secondary">
                      ¿Ya tienes cuenta?{" "}
                      <Link
                        to="/login"
                        className="text-danger text-decoration-none"
                      >
                        Inicia sesión
                      </Link>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

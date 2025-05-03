import { useForm } from "react-hook-form";
import { createUser, updateUser, getUser } from "../../../API/User.Api";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  Button,
  Container,
  Nav,
  Navbar,
  Row,
  Col,
  Form,
} from "react-bootstrap";

import fondo from "../../../assets/img/hamburgesa7.jpg";

export function RegisterFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateUser(params.id, data);
      toast.success("Usuario actualizado");
    } else {
      await createUser(data);
      toast.success("Usuario creado");
    }
    navigate("/users");
  });

  useEffect(() => {
    async function loadUser() {
      if (params.id) {
        const res = await getUser(params.id);
        setValue("username", res.data.name);
        setValue("email", res.data.email);
        setValue("password", res.data.password);
        setValue("first_name", res.data.first_name);
        setValue("last_name", res.data.last_name);
        setValue("phone_number", res.data.phone_number);
      }
    }
    loadUser();
  }, []);

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
            <Form onSubmit={onSubmit}>
              {/* Sección de Información de Cuenta */}
              <div className="mb-4">
                <h5 className="text-secondary mb-3">Información de Cuenta</h5>

                <Form.Group className="mb-3">
                  <Form.Label>Nombre de usuario*</Form.Label>
                  <Form.Control
                    name="username"
                    type="text"
                    isInvalid={!!errors.username}
                    {...register("email", { required: true })}
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
                    isInvalid={!!errors.email}
                    {...register("email", { required: true })}
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
                    isInvalid={!!errors.password}
                    {...register("password", { required: true })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>

              {/* Sección de Información Personal */}
              <div className="mb-4">
                <h5 className="text-secondary mb-3">Información Personal</h5>

                <Form.Group className="mb-3">
                  <Form.Label>Nombre*</Form.Label>
                  <Form.Control
                    name="first_name"
                    type="text"
                    isInvalid={!!errors.first_name}
                    {...register("first_name", { required: true })}
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
                    isInvalid={!!errors.username}
                    {...register("last_name", { required: true })}
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
                    isInvalid={!!errors.username}
                    {...register("phone_number", { required: true })}
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
          </div>
        </Col>
      </Row>
    </Container>
  );
}

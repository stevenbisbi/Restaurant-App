import { useForm } from "react-hook-form";
import { createUser, updateUser, getUser } from "../../../api/users/user.api";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Button, Container, Spinner, Row, Col, Form } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { setCredentials } from "../../../redux/authSlice";
import { loginUser } from "../../../api/users/user.api";

import fondo from "../../../assets/img/hamburgesa7.jpg";

export function RegisterFormPage() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const { email, first_name, last_name, password = "" } = data;

      if (params.id) {
        await updateUser(params.id, { email, first_name, last_name });
        toast.success("Usuario actualizado exitosamente");
      } else {
        const {
          data: { token, user },
        } = await createUser({
          email,
          first_name,
          last_name,
          password,
        });
        toast.success("Usuario registrado exitosamente");

        // Hacer login automático después de crear usuario:
        const response = await loginUser({ email, password });
        if (response.status === 200) {
          const { token, user } = response.data;
          dispatch(
            setCredentials({
              token,
              firstName: user.first_name,
              // otros campos si quieres
            })
          );

          if (data.rememberMe) {
            localStorage.setItem("token", token);
          } else {
            sessionStorage.setItem("token", token);
          }
        }
      }
      navigate("/home");
    } catch (error) {
      const msg = error.response?.data?.message || "Algo salió mal";
      toast.error(`Error: ${msg}`);
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    async function loadUser() {
      if (params.id) {
        const res = await getUser(params.id);
        setValue("email", res.data.email);
        setValue("first_name", res.data.first_name);
        setValue("last_name", res.data.last_name);
      }
    }
    loadUser();
  }, [params.id, setValue]);

  const [loading, setLoading] = useState(false);
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
                  <Form.Label>Nombre:</Form.Label>
                  <Form.Control
                    type="text"
                    isInvalid={!!errors.first_name?.message}
                    {...register("first_name", {
                      required: "El nombre es obligatorio",
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.first_name?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Apellido:</Form.Label>
                  <Form.Control
                    type="text"
                    isInvalid={!!errors.last_name?.message}
                    {...register("last_name", {
                      required: "El apellido es obligatorio",
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.last_name?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    isInvalid={!!errors.email?.message}
                    {...register("email", {
                      required: "El email es obligatorio",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Ingresa un correo válido con punto (.)",
                      },
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Contraseña:</Form.Label>
                  <Form.Control
                    type="password"
                    autoComplete="new-password"
                    isInvalid={!!errors.password?.message}
                    {...register("password", {
                      required: !params.id && "La contraseña es obligatoria",
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                {!params.id && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Confirmar Contraseña:</Form.Label>
                      <Form.Control
                        type="password"
                        autoComplete="new-password"
                        isInvalid={!!errors.confirmPassword?.message}
                        {...register("confirmPassword", {
                          required: "Confirma la contraseña",
                          validate: (value) =>
                            value === watch("password") ||
                            "Las contraseñas no coinciden",
                        })}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </>
                )}
              </div>

              <Button
                variant="danger"
                type="submit"
                className="w-100 py-2 fw-bold text-white"
                disabled={loading}
              >
                {" "}
                {loading ? (
                  <Spinner animation="border" />
                ) : params.id ? (
                  "Actualizar"
                ) : (
                  "Registrarse"
                )}
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

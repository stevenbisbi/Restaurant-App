import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Borra los tokens de ambas opciones
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    toast.success("Sesión cerrada con éxito");
    navigate("/login"); // Redirige al login
  };

  return (
    <Button
      variant="outline-danger"
      onClick={handleLogout}
      className="logout-button"
    >
      Cerrar sesión
    </Button>
  );
};

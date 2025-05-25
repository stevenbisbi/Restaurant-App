import { useMenus } from "../../../hooks/useMenus";
import { Link } from "react-router-dom";

export function MenuAdminPage() {
  console.log("MenuAdminPage rendered");
  const { menus, loading, error } = useMenus();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los menús</p>;

  return (
    <div>
      <h2>Listado de Menús</h2>
      <Link to="/admin/menu/create" className="btn btn-primary">
        Crear nuevo menú
      </Link>
      <ul>
        {menus.map((menu) => (
          <li key={menu.id}>
            {menu.name}
            <Link
              to={`/admin/menu/edit/${menu.id}`}
              className="btn btn-sm btn-outline-secondary mx-2"
            >
              Editar
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

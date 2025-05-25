import { useState, useEffect } from "react";
import { createMenu, updateMenu, getMenu } from "../../../api/menuApi";
import { getAllRestaurants } from "../../../api/restaurantsApi";
import { useNavigate, useParams } from "react-router-dom";

export function MenuAdminForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    is_active: false,
    restaurant: "", // Ajusta esto según cómo asignes restaurantes
  });

  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    getAllRestaurants().then((res) => setRestaurants(res.data));
    console.log("Restaurants:", restaurants);
    if (isEdit) {
      getMenu(id).then((res) => setFormData(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await updateMenu(id, formData);
    } else {
      await createMenu(formData);
    }
    navigate("/admin/menu");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEdit ? "Editar Menú" : "Crear Menú"}</h2>

      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Nombre del menú"
        required
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Descripción"
      />
      <label>
        Restaurante:
        <select
          name="restaurant"
          value={formData.restaurant}
          onChange={handleChange}
          required
        >
          <option value="">-- Restaurante --</option>
          {restaurants.map((rest) => (
            <option key={rest.id} value={rest.id}>
              {rest.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Activo:
        <input
          type="checkbox"
          name="is_active"
          checked={formData.is_active}
          onChange={handleChange}
        />
      </label>

      <button type="submit" className="btn btn-success">
        {isEdit ? "Actualizar" : "Crear"}
      </button>
    </form>
  );
}

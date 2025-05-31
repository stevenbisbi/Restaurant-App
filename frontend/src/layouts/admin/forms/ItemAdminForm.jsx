import { useState, useEffect } from "react";
import {
  createMenuItem,
  updateMenuItem,
  getMenuItem,
} from "../../../api/menu/menuItemApi";
import { useNavigate, useParams } from "react-router-dom";
import { useCategories } from "../../../hooks/useCategories";

export function ItemAdminForm() {
  const categories = useCategories();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    is_promotion: false,
    is_featured: false,
    is_vegetarian: false,
    is_active: false,
    image: null,
  });

  useEffect(() => {
    console.log("Categorías:", categories);

    if (isEdit) {
      getMenuItem(id).then((res) => setFormData(res.data));
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

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("is_promotion", formData.is_promotion);
    data.append("is_featured", formData.is_featured);
    data.append("is_vegetarian", formData.is_vegetarian);
    data.append("is_active", formData.is_active);

    if (formData.image) {
      data.append("image", formData.image); // Archivo image
    }

    if (isEdit) {
      await updateMenuItem(id, data);
    } else {
      await createMenuItem(data);
    }
    navigate("/admin/items");
  };

  if (categories.length === 1) {
    return (
      <div className="text-center m-5">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Cargando categorías...</span>
        </div>
        <p>Cargando categorías, por favor espera...</p>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="text-center m-5">
        <div className="alert alert-warning" role="alert">
          No hay categorías disponibles. Por favor, crea una categoría antes de
          agregar un item al menú.
        </div>
      </div>
    );
  }

  const displayCategories = [
    { name: "-- Selecciona una Categoría --", id: "" },
    ...categories,
  ];

  return (
    <div className="container py-4">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title mb-4 text-center">
            {isEdit ? "Editar Item" : "Crear Item"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombre Producto:
              </label>
              <input
                id="name"
                className="form-control"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej. Sandwich de pollo"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Precio:
              </label>
              <input
                id="price"
                className="form-control"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Ej. 9000"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Categoría:
              </label>
              <select
                id="category"
                className="form-select"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                {displayCategories.map((category, index) => (
                  <option
                    key={category.id || `default-${index}`}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Imagen:
              </label>
              <input
                id="image"
                className="form-control"
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    image: e.target.files[0], // Guardamos el archivo en el estado
                  });
                }}
              />
            </div>

            <textarea
              className="form-control mb-3"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descripción"
            />

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                name="is_active"
                id="is_active"
                checked={formData.is_active}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="is_active">
                Activo
              </label>
            </div>
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                name="is_featured"
                id="is_featured"
                checked={formData.is_featured}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="is_featured">
                Destacado
              </label>
            </div>
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                name="is_promotion
"
                id="is_promoted"
                checked={formData.is_promotion}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="is_promotion">
                Promocionado
              </label>
            </div>
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                name="is_vegetarian"
                id="is_vegetarian"
                checked={formData.is_vegetarian}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="is_vegetarian">
                Vegetariano
              </label>
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-success">
                {isEdit ? "Actualizar" : "Crear"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

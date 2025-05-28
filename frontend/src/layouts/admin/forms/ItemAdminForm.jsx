import { useState, useEffect } from "react";
import {
  createItemMenu,
  updateItemMenu,
  getItemMenu,
} from "../../../api/menu/menuItemApi";
import { useNavigate, useParams } from "react-router-dom";

export function ItemAdminForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    is_promoted: false,
    is_featured: false,
    is_vegetarian: false,
    is_active: false,
  });

  useEffect(() => {
    if (isEdit) {
      getItemMenu(id).then((res) => setFormData(res.data));
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
    console.log("Form Data:", formData);
    e.preventDefault();
    if (isEdit) {
      await updateItemMenu(id, formData);
    } else {
      await createItemMenu(formData);
    }
    navigate("/admin/item_menu");
  };

  return (
    <div className="container py-4">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title mb-4">
            {isEdit ? "Editar Menú" : "Crear Menú"}
          </h2>{" "}
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
                name="is_promoted"
                id="is_promoted"
                checked={formData.is_promoted}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="is_promoted">
                Promocionado
              </label>
            </div>
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                name="is_vegatarian"
                id="is_vegatarian"
                checked={formData.is_vegatarian}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="is_vegatarian">
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

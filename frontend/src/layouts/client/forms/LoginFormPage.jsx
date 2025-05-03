import { useForm } from "react-hook-form";
import { createAuthor, updateAuthor, getAuthor } from "../api/Author.api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getAllGroups } from "../api/Group.api";

export function AuthorFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();
  const [groups, setGroups] = useState([]);

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateAuthor(params.id, data);
      toast.success("Autor actualizado");
    } else {
      await createAuthor(data);
      toast.success("Autor creado");
    }
    navigate("/authors");
  });

  useEffect(() => {
    async function loadAuthor() {
      if (params.id) {
        const res = await getAuthor(params.id);
        setValue("name", res.data.name);
        setValue("last_name", res.data.last_name);
        setValue("email", res.data.email);
        setValue("nationality", res.data.nationality);
        setValue("group_name", res.data.group_name);
      }
    }
    async function loadGroups() {
      const res = await getAllGroups();
      setGroups(res.data);
    }
    loadAuthor();
    loadGroups();
  }, []);

  return (
    <div className="container">
      <div className="col-md-4 offset-md-4">
        <form onSubmit={onSubmit} className="card card-body mt-5">
          <h2 className="text-center mb-4">Autor</h2>
          <input
            className="form-control mb-3"
            type="text"
            placeholder="Nombre"
            {...register("name", { required: true })}
          />
          {errors.name && <span>Este campo es requerido</span>}
          <input
            className="form-control mb-3"
            type="text"
            placeholder="Apellido"
            {...register("last_name", { required: true })}
          />
          <input
            className="form-control mb-3"
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          <input
            className="form-control mb-3"
            type="text"
            placeholder="Nacionalidad"
            {...register("nationality", { required: true })}
          />
          <select
            {...register("id_group", { required: true })}
            className="form-control mb-3"
            defaultValue=""
          >
            <option value="" disabled>
              Seleccione el grupo de investigación
            </option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name + " - " + group.line}
              </option>
            ))}
          </select>
          {errors.id_group && <span>Este campo es requerido</span>}
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

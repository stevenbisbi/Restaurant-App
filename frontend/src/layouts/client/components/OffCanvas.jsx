import { Avatar } from "./Avatar";
import { LogoutButton } from "./LogoutButton";

export function OffCanvas({ name }) {
  return (
    <>
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        {/* Encabezado del Offcanvas */}
        <div className="offcanvas-header">
          {/* Contenedor principal del avatar y nombre */}
          <div className="d-flex align-items-center gap-3">
            <Avatar name={name} />

            {/* Información del usuario */}
            <div>
              <h4 className="mb-0 fw-normal">{name || "Usuario"}</h4>
              <small className="text-muted">Cliente</small>
            </div>
          </div>

          {/* Botón de cierre */}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Cerrar"
          ></button>
        </div>

        {/* Cuerpo del Offcanvas */}
        <div className="offcanvas-body">
          {/* Contenido principal aquí */}
          <p className="text-muted">Coloca tu contenido aquí</p>
          <LogoutButton />
        </div>
      </div>
    </>
  );
}

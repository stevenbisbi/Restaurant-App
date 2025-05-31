import { Button } from "react-bootstrap";

export function ModalDelete({ onConfirm }) {
  return (
    <div
      className="modal fade"
      id="DeleteModal"
      tabIndex="-1"
      aria-labelledby="DeleteModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body text-center">¿ Deseas eliminar ?</div>
          <div className="modal-footer justify-content-center">
            <Button
              variant="outline-danger"
              data-bs-dismiss="modal"
              onClick={onConfirm}
            >
              Sí
            </Button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

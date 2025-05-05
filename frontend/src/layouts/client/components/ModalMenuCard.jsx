import React from "react";

export function ModalMenuCard({ selectedObject }) {
  return (
    // This is the modal that will be displayed when a card is clicked
    <div
      className="modal fade border-warning"
      id="modalMenuCard"
      tabIndex="-1"
      aria-labelledby="modalMenuCardLabel"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="modalMenuCardLabel">
              {selectedObject?.name}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="">
            <div className="modal-body">
              <div className="d-flex justify-content-center">
                <img
                  src={selectedObject?.image}
                  className="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div className="d-flex justify-content-center mt-3">
                <p>{selectedObject?.description}</p>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-warning "
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

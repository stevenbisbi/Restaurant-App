import { Avatar } from "./Avatar";

export function OffCanvas({ username }) {
  return (
    <div
      className="offcanvas offcanvas-end"
      data-bs-scroll="true"
      data-bs-backdrop="false"
      tabIndex="-1"
      id="offcanvasScrolling"
      aria-labelledby="offcanvasScrollingLabel"
    >
      <div className="offcanvas-header d-flex align-items-center justify-content-between">
        <h5 className="offcanvas-title" id="offcanvasScrollingLabel">
         <Avatar username={username}/>
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <p>Cliente.</p>
      </div>
    </div>
  );
}

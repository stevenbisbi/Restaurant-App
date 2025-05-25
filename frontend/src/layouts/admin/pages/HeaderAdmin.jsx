export function HeaderAdmin(props) {
  const { title, btnTitle, btnCreateClick, btnDelete, btnDeleteClick } = props;
  return (
    <header>
      <h1>{title}</h1>

      <div className="d-flex justify-content-between align-items-center mb-3">
        {btnTitle && (
          <button className="btn btn-primary" onClick={btnCreateClick}>
            {btnTitle}
          </button>
        )}
        {btnDelete && (
          <button className="btn btn-danger" onClick={btnDeleteClick}>
            Eliminar
          </button>
        )}
      </div>
    </header>
  );
}

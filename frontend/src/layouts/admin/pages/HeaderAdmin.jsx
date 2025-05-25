export function HeaderAdmin(props) {
  const { title, btnTitle, btnCreateClick, btnDelete, btnDeleteClick } = props;
  return (
    <header>
      <h1 className="text-center py-3">{title}</h1>

      <div className="d-flex align-items-center mb-3">
        {btnTitle && (
          <button className="btn btn-primary" onClick={btnCreateClick}>
            {btnTitle}
          </button>
        )}
      </div>
    </header>
  );
}

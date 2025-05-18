export  function Aside() {
  return (
    <>
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-light mx-2 rounded-5" style={{ width: "75px" }}>
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <span className="fs-4 text-dark">Admin Panel</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item ">
                <a href="/admin/users" className="nav-link active text-dark" aria-current="page">
                Users
                </a>
            </li>
            <li>
                <a href="/admin/settings" className="nav-link text-dark">
                Settings
                </a>
            </li>
            </ul>
        </div>

    </>
  )
}

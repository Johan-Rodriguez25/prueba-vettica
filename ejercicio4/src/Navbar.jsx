import { Link, Outlet, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const onLogout = () => {
    fetch("http://localhost:8000/v1/api/logout/", {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 204) {
          localStorage.removeItem("token");
          navigate("/login", {
            replace: true,
          });
        }
      })
      .catch((error) => {
        console.log("Error al cerrar sesion:", error);
      });
  };

  return (
    <>
      <header>
        <h1>
          <Link to="/">Logo</Link>
        </h1>

        {token ? (
          <div className="user">
            <button className="btn-logout" onClick={onLogout}>
              Logout
            </button>
          </div>
        ) : (
          <nav>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
          </nav>
        )}
      </header>

      <Outlet />
    </>
  );
}

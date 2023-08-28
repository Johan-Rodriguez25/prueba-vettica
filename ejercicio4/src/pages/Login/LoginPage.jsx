import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/", {
        replace: true,
      });
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onLogin = async (data) => {
    const requestData = {
      username: data.username,
      password: data.password,
    };

    try {
      const response = await fetch("http://localhost:8000/v1/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        alert("Login exitoso");

        navigate("/", {
          replace: true,
        });
      } else {
        alert("Error al iniciar sesión. Verifica tus credenciales.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit(onLogin)}>
        <h1>Login</h1>

        <div className="input-group">
          <input
            type="text"
            {...register("username", { required: true })}
            name="username"
            id="username"
            autoComplete="off"
          />
          <label htmlFor="username">Username:</label>
          {errors.username?.type === "required" && "Username is required"}
        </div>
        <div className="input-group">
          <input
            type="password"
            {...register("password", { required: true })}
            name="password"
            id="password"
            autoComplete="off"
          />
          <label htmlFor="password">Password:</label>
          {errors.password?.type === "required" && "Password is required"}
        </div>

        <button>Login</button>
      </form>
    </div>
  );
}

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
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

  const onSignup = async (data) => {
    const requestData = {
      username: data.username,
      password: data.password,
    };

    try {
      const response = await fetch("http://localhost:8000/v1/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        alert("Sign up exitoso");

        navigate("/login", {
          replace: true,
        });
      } else {
        alert("Error al registrarse.");
      }
    } catch (error) {
      console.error("Error al registrarse:", error);
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit(onSignup)}>
        <h1>Sign up</h1>

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
            {...register("password", { required: true, minLength: 8 })}
            name="password"
            id="password"
            autoComplete="off"
          />
          <label htmlFor="password">Password:</label>
          {errors.password?.type === "required" && "Password is required"}
          {errors.password?.type === "minLength" && "Min Length is required"}
        </div>

        <button>Sign up</button>
      </form>
    </div>
  );
}

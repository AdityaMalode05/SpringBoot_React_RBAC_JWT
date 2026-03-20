import { useForm } from "react-hook-form";
import { loginUser } from "../api/authapi";
import type { LoginRequest, AuthResponse } from "../types/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const navigate = useNavigate();

  const onSubmit = async (data: LoginRequest) => {
    try {
      const res = await loginUser(data);
      const response: AuthResponse = res.data;

      localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.role);

      toast.success("Login successful 🚀");

      if (response.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid credentials!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-2xl shadow-xl w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email format",
            },
          })}
          className="w-full p-2 mb-1 border rounded"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 3,
              message: "Minimum 3 characters",
            },
          })}
          className="w-full p-2 mt-2 mb-1 border rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition mt-2"
        >
          Login
        </button>

        <p className="text-sm text-center mt-3">
          Don’t have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;

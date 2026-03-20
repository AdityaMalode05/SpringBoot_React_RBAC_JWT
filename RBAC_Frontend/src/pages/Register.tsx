import { useForm } from "react-hook-form";
import { registerUser } from "../api/authapi";
import type { RegisterRequest } from "../types/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>();

  const navigate = useNavigate();

  const onSubmit = async (data: RegisterRequest) => {
    try {
      await registerUser(data);

      toast.success("User registered successfully 🎉");

      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Registration failed!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-2xl shadow-xl w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        <input
          type="text"
          placeholder="Name"
          {...register("name", { required: "Name is required" })}
          className="w-full p-2 mb-1 border rounded"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

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
          className="w-full p-2 mt-2 mb-1 border rounded"
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

        {/* ROLE */}
        <select
          {...register("role", { required: true })}
          className="w-full p-2 mt-2 mb-3 border rounded"
        >
          <option value="">Select Role</option>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
        >
          Register
        </button>

        <p className="text-sm text-center mt-3">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;

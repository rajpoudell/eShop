import React, {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loginUsers } from "../redux/slices/userSlice"; // Import login action
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Validation schema using Yup
const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, loading, error } = useSelector((state) => state.user);
  
  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, 
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Redirect user if already logged in
  useEffect(() => {
    if (userInfo) {
      navigate("/"); // Redirect to dashboard or home
    }
  }, [userInfo, navigate]);

  // Handle login form submission
  const onSubmit =  (data) => {
     dispatch(loginUsers(data));
    toast.success("Logging...")
    reset(); 
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-200 ">
      <div className="w-full max-w-md bg-slate-100 p-8 rounded-lg shadow-lg ">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>

        {/* Display error if login fails */}
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className="mt-1 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="current-email"
            />
            <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              {...register("password")}
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              className="mt-1 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-xs mt-1">{errors.password?.message}</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 mt-4 text-white rounded-lg ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            } transition-all`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Option to switch to registration page */}
        <p className="text-sm text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

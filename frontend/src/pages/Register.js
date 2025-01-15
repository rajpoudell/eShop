import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUsers } from "../redux/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {userInfo, loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    role:null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (userInfo) {
      navigate("/"); // Redirect to dashboard or home
    }
  }, [userInfo, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUsers(formData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/"); // Redirect to home after successful registration
        formData({
          name: "",
          email: "",
          phone: "",
          password: "",
          address: "",
          role:null,
        })
      }
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-200 ">
      <div className="w-full max-w-md bg-slate-100 p-8 rounded-lg shadow-lg ">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Register
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full p-2 mb-4 border rounded"
          />
          <div className="w-full p-2 mb-2 border rounded">
            <label className="block text-gray-600"></label>
            <select
              name="isAdmin"
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="" >
                Select a role
              </option>
              <option value="false" >
                Customer
              </option>
              <option value="true" >
                Seller
              </option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

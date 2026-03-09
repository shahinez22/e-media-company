import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./Authcontext";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, API_URL } = useAuth();
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/register.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: formData.name,
          firstName: formData.firstName,
          email: formData.email,
          password: formData.password,
          accountType: formData.accountType,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Auto login after successful registration
        login(data.user);
        navigate("/home");
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("An error occurred. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full sm:max-w-md md:max-w-lg">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
          Create Account ✨
        </h1>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              User Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm md:text-base
                         disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm md:text-base
                         disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm md:text-base
                         disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              minLength="6"
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm md:text-base
                         disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={loading}
              minLength="6"
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm md:text-base
                         disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Account Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Account Type
            </label>
            <select
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm md:text-base
                         disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">-- Select --</option>
              <option value="journalist">Journalist</option>
              <option value="reader">Blogger</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-300 text-black py-3 rounded-lg font-semibold 
                       hover:bg-yellow-600 transition-colors text-sm md:text-base
                       disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          {/* Redirect to Sign In */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-yellow-600 font-medium hover:underline"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
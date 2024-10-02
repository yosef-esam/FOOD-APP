import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
function RegisterPage() {
  const { register, user } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirectTo = params.get("redirect_to") || "/";

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    // Input validation
    let valid = true;
    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      valid = false;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      valid = false;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      valid = false;
    }

    if (!valid) return;

    // Proceed with registration if no errors
    try {
      await register({
        name: name,
        email: email,
        password: password,
        address: address,
      });
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    if (!user) return;
    if (user) {
      navigate(redirectTo);
    }
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Register Page</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                emailError && "border-red-500"
              }`}
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                passwordError && "border-red-500"
              }`}
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                confirmPasswordError && "border-red-500"
              }`}
            />
            {confirmPasswordError && (
              <p className="text-red-500 text-sm mt-1">
                {confirmPasswordError}
              </p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300"
          >
            Register
          </button>
          {error && (
            <p className="text-red-500 text-sm mt-1 text-center">{error}</p>
          )}
        </form>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link
            className="text-blue-500 underline"
            to={`/login${redirectTo ? `?redirect_to=` + redirectTo : ``}`}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;

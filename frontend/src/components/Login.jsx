import axios from "axios";
import { Eye } from "lucide-react";
import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { BACKEND_URL } from "../utils/utils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [authUser,setAuthUser] = useContext(AuthContext);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.post(
      ` ${BACKEND_URL}/user/login`,
        { email, password },
        { withCredentials: true }
      );
      console.log(data);
      alert(data.message || "Login Succeeded");
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      setAuthUser(data.token);
      navigate("/");
    } catch (error) {
      const msg = error?.response?.data?.errors || "Login Failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-[#1e1e1e] text-white w-full max-w-md rounded-2xl p-6 shadow-lg">
        {/* Heading */}
        <h1 className="text-white items-center justify-center text-center">
          Login
        </h1>

        {/* email */}
        <div className="mb-4 mt-2">
          <input
            className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#7a6ff0]"
            type="text"
            name="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* password */}
        <div className="mb-4 mt-2 relative">
          <input
            className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#7a6ff0]"
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className=" absolute right-3 top-3 text-gray-400">
            {" "}
            <Eye size={18} />{" "}
          </span>
        </div>

        {/* Error Message */}
        {error && <span className="text-red-600 text-sm mb-4">{error}</span>}

        {/* Terms & Condition */}
        <p className="text-xs text-gray-400 mt-4 mb-6">
          By signing up or logging in, you consent to DeepSeek's{" "}
          <a className="underline" href="">
            Terms of Use
          </a>{" "}
          and{" "}
          <a className=" underline" href="">
            Privacy Policy
          </a>{" "}
          .
        </p>

        {/* Login button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className=" w-full bg-[#7a6ff6] hover:bg-[#6c61a6] text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "logging in... " : "Login"}
        </button>

        {/* Links */}
        <div className="flex justify-between mt-4 text-sm">
          <a className="text-[#7a6ff6] hover:underline" href="">
            Haven't account?
          </a>
          <Link className="text-[#7a6ff6] hover:underline" to={"/signup"}>
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

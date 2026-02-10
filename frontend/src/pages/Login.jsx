

import React, { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      loginUser({
        token: res.data.token,
        user: {
          _id: res.data._id,
          name: res.data.name,
          email: res.data.email,
          role: res.data.role
        }
      });

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="center-box">
      {/* FLOATING DOCUMENT BACKGROUND */}
      <div className="doc-bg">
        <div className="doc-sheet one"></div>
        <div className="doc-sheet two rotate"></div>
        <div className="doc-sheet three small"></div>
        <div className="doc-sheet four"></div>
        <div className="doc-sheet five small rotate"></div>
      </div>

      {/* LOGIN CARD */}
      <div className="login-card">
        <div className="login-title">Welcome Back</div>
        <div className="login-subtitle">
          Sign in to continue to your account
        </div>

        <div className="role-info">
          <span>User</span>
          <span>Reviewer</span>
          <span>Admin</span>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            required
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button type="submit">Login</button>
        </form>

        <div className="create-account">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/register")}>
            Create Account
          </span>
        </div>
      </div>
    </div>
  );
}

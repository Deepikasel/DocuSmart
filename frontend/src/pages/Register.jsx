import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
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

      {/* REGISTER CARD */}
      <div className="login-card">
        <div className="login-title">Create Account</div>
        <div className="login-subtitle">
          Join DocuSmart and start managing documents
        </div>

        <form onSubmit={submit}>
          <input
            placeholder="Full Name"
            required
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

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
            autoComplete="new-password"
            required
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <select
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
          >
            <option value="user">User</option>
            <option value="reviewer">Reviewer</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit">Register</button>
        </form>

        <div className="create-account">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>
            Login
          </span>
        </div>
      </div>
    </div>
  );
}

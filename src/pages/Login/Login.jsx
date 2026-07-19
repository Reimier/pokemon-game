import React from "react";
import "./login.css";
import { NavLink } from "react-router";

export default function Login() {
  return (
    <div className="login-container">
      <div className="card">
        <h4 className="title">Log In!</h4>

        <form>
          <div className="field">
            <p className="input-icon">
              <i class="fa-solid fa-at"></i>
            </p>

            <input
              type="email"
              className="input-field"
              placeholder="Email"
            />
          </div>

          <div className="field">
            <p className="input-icon">
              <i class="fa-solid fa-key"></i>
            </p>

            <input
              type="password"
              className="input-field"
              placeholder="Password"
            />
          </div>

          <button className="btn" type="submit">
           <i class="fa-solid fa-right-to-bracket"></i> Login
          </button>

          <NavLink to="/register" className="btn-link">
            Don't have an account? Register here!
          </NavLink>
        </form>
      </div>
    </div>
  );
}
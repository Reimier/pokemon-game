import React from "react";
import "./register.css";
import { NavLink } from "react-router";

export default function Register() {
  return (
    <div className="register-container">
      <div className="register-card">
        <h4 className="title">Register here!</h4>

        <form>
            <div className="field">
            <p className="input-icon">
             <i class="fa-regular fa-circle-user"></i>
            </p>

            <input
              type="text"
              className="input-field"
              placeholder="Username"
            />
          </div>

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
           <i class="fa-solid fa-person-circle-plus"></i> Register
          </button>

          <NavLink to="/login" className="btn-link">
            Already have an account? Login here!
          </NavLink>
        </form>
      </div>
    </div>
  );
}
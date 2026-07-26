import React, { useState } from "react";
import "./register.css";
import { NavLink } from "react-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";

export default function Register() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function registerUser()
  {

    createUserWithEmailAndPassword(auth, email, password).then(()=>{

      alert("Success Registration");

    }).catch((error)=>{
      alert(error.message);
    }

    )

  }

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
              onChange={(e)=>setEmail(e.target.value)}
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
              onChange={(e)=>setPassword(e.target.value)}
              type="password"
              className="input-field"
              placeholder="Password"
            />
          </div>

          <button onClick={registerUser} className="btn" type="submit">
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
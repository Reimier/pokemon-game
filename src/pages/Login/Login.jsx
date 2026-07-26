import React, { useState } from "react";
import "./login.css";
import { NavLink } from "react-router";
import { auth } from "../../firebase.config";
import { signInWithEmailAndPassword } from "@firebase/auth";

export default function Login() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
  
    function loginUser()
    {
  
      signInWithEmailAndPassword(auth, email, password).then(()=>{
  
        alert("Success Login");
  
      }).catch((error)=>{
        alert(error.message);
      }
  
      )
  
    }

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

          <button onClick={loginUser} className="btn" type="submit">
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
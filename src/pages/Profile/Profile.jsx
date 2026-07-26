import { useEffect, useState } from "react";
import "./profile.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.config";

export default function Profile() {

    const [user, setUser] = useState();
  
    useEffect(()=>{
  
      onAuthStateChanged(auth, (u)=>{
        setUser(u);
      })
  
    }
    )

    function logout(){

      auth.signOut().then(()=>{
        alert("Logged Out")
      }

      )
    }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h4 className="title">My Profile</h4>

        <div className="profile-field">
          <p className="input-icon">
            <i className="fa-regular fa-circle-user"></i>
          </p>

          {user &&
          <>
          <span className="profile-name">{user.email}</span>
          </>
          }
          
        </div>

        <div className="profile-stats">
          <div className="stat">
            <span className="stat-value">128</span>
            <span className="stat-label">Highest Streak</span>
          </div>
          <div className="stat">
            <span className="stat-value">42</span>
            <span className="stat-label">Highest Ranking</span>
          </div>
        </div>

        <button className="btn delete-btn" type="button">
          <i class="fa-solid fa-floppy-disk"></i> Save edit
        </button>

        <button className="btn delete-btn" type="button">
          <i className="fa-solid fa-trash"></i> Delete Account
        </button>

        <button onClick={(logout)} className="btn logout-btn" type="button">
          <i className="fa-solid fa-right-from-bracket"></i> Logout
        </button>
        
      </div>
    </div>
  );
}

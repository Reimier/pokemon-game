import { useEffect, useState } from "react";
import "./profile.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase.config";
import { ref, update } from "firebase/database";
import { EMPTY_STREAKS, subscribeUserData } from "../../utils/streakService";

export default function Profile() {

    const [user, setUser] = useState();
    const [userData, setUserData] = useState();
    const [userName, setUserName] = useState();

    useEffect(()=>{

      const unsubAuth = onAuthStateChanged(auth, (u)=>{

        if(u){
          setUser(u);
        }

      })

      return () => unsubAuth();

    }, [])

    useEffect(() => {
      if (!user) return;

      const unsubData = subscribeUserData(user.uid, (data) => {
        setUserData(data);
        setUserName(data?.userName || "");
      });

      return () => unsubData();
    }, [user]);

    function save() {
      if (!userName.trim()) {
        alert("Username cannot be empty.");
        return;
      }

      // Only touch the username field so streak / ranking data is preserved.
      update(ref(db, `users/${user.uid}`), {
        userName: userName.trim(),
      })
        .then(() => alert("Profile updated!"))
        .catch((err) => console.log(err));
    }

    function logout(){

      auth.signOut().then(()=>{
        alert("Logged Out")
      }

      )
    }

    const highestStreaks = userData?.highestStreaks || EMPTY_STREAKS;
    const highestStreak = Math.max(
      highestStreaks.easy || 0,
      highestStreaks.normal || 0,
      highestStreaks.hard || 0,
      highestStreaks.impossible || 0
    );
    const highestRanking = userData?.bestRank ? `#${userData.bestRank}` : "—";

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h4 className="title">My Profile</h4>

        <div className="profile-field">
          <p className="input-icon">
            <i className="fa-regular fa-circle-user"></i>
          </p>

          {user && userData &&
          <>
            <input
              type="text"
              className="profile-name"
              value={userName || ""}
              onChange={(e) => setUserName(e.target.value)}
            />
          </>
          }
          
        </div>

        <div className="profile-stats">
          <div className="stat">
            <span className="stat-value">{highestStreak}</span>
            <span className="stat-label">Highest Streak</span>
          </div>
          <div className="stat">
            <span className="stat-value">{highestRanking}</span>
            <span className="stat-label">Highest Ranking</span>
          </div>
        </div>

        <button onClick={(save)} className="btn delete-btn" type="button">
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

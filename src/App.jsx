import NavBar from "./components/NavBar/NavBar";
import { HashRouter as Router, Route, Routes, Navigate } from "react-router";
import PokemonCardEasy from "./components/PokemonCardEasy/PokemonCardEasy";
import Contact from "./pages/Contact/Contact";
import PokemonCardHard from "./components/PokemonCardHard/PokemonCardHard";
import PokemonCardNormal from "./components/PokemonCardNormal/PokemonCardNormal";
import PokemonCardImpossible from "./components/PokemonCardImpossible/PokemonCardImpossible";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.config";

function App() {

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(()=>{

    onAuthStateChanged(auth, (u)=>{
      setUser(u);
      setLoading(false);

    })

  },[])

  if(loading) return(<></>)

  return (
    <>
      <Router>
        <NavBar />

        <div id="main-container">
          <Routes>

            {!user &&
            <>
            {/* public */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to={"/register"}/>} />
            </>
            }

            {user &&
            <>
            {/* private */}
            <Route path="/" element={<PokemonCardEasy />} />
            <Route path="/easy" element={<PokemonCardEasy />} />
            <Route path="/normal" element={<PokemonCardNormal />} />
            <Route path="/hard" element={<PokemonCardHard />} />
            <Route path="/impossible" element={<PokemonCardImpossible />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to={"/"}/>} />
            </>
            }

          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

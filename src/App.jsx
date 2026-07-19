import NavBar from "./components/NavBar/NavBar";
import { HashRouter as Router, Route, Routes } from "react-router";
import PokemonCardEasy from "./components/PokemonCardEasy/PokemonCardEasy";
import Contact from "./pages/Contact/Contact";
import PokemonCardHard from "./components/PokemonCardHard/PokemonCardHard";
import PokemonCardNormal from "./components/PokemonCardNormal/PokemonCardNormal";
import PokemonCardImpossible from "./components/PokemonCardImpossible/PokemonCardImpossible";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  return (
    <>
      <Router>
        <NavBar />

        <div id="main-container">
          <Routes>
            <Route path="/" element={<PokemonCardEasy />} />
            <Route path="/easy" element={<PokemonCardEasy />} />
            <Route path="/normal" element={<PokemonCardNormal />} />
            <Route path="/hard" element={<PokemonCardHard />} />
            <Route path="/impossible" element={<PokemonCardImpossible />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<PokemonCardEasy />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

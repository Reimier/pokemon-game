
import NavBar from "./components/NavBar/NavBar"
import {BrowserRouter, Route, Routes} from "react-router"
import PokemonCardEasy from "./components/PokemonCardEasy/PokemonCardEasy"
import Contact from "./pages/Contact/Contact"
import PokemonCardHard from "./components/PokemonCardHard/PokemonCardHard"
import PokemonCardNormal from "./components/PokemonCardNormal/PokemonCardNormal"

function App() {
  

  return (
    <>

     <BrowserRouter>

      <NavBar/>

      <div id="main-container">
        <Routes>
          <Route path="/*" element={<PokemonCardEasy />} />
          <Route path="/easy" element={<PokemonCardEasy />} />
          <Route path="/normal" element={<PokemonCardNormal/>} />
          <Route path="/hard" element={<PokemonCardHard/>} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>

    </BrowserRouter>


     
    </>
  )
}

export default App

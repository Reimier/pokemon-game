import { useEffect, useState } from "react";
import "./pokemon-card-normal.css";
import { NavLink } from "react-router";
import RankingCard from "../RankingCard/RankingCard";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.config";
import { recordCorrectGuess, resetCurrentStreak } from "../../utils/streakService";

const DIFFICULTY = "normal";

function PokemonCardNormal() {

  const [uid, setUid] = useState(null);
  const [pokemon, setPokemon] = useState(null);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [streak, setStreak] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => setUid(u ? u.uid : null));
    loadRandomPokemon();
    return () => unsubAuth();
  }, []);

  const loadRandomPokemon = () => {
    const randomId = Math.floor(Math.random() * 151) + 1; 
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  };

  const handleGuess = () => {
    if (!pokemon) return;

    if (guess.toLowerCase().trim()  === pokemon.name.toLowerCase()) {

      setStreak(prev => {
        const next = prev + 1;
        recordCorrectGuess(uid, DIFFICULTY, next);
        return next;
      });
      setMessage(`✅ Correct! It's ${pokemon.name}!`);
      setRevealed(true);

    } else {

      setMessage("❌ Wrong! Try again.");
      setRevealed(false);
    }
  };

  const playAgain = () => {
    setRevealed(false);
    setGuess("");
    setMessage("");
    loadRandomPokemon();
  };

    const skip = () => {
    setRevealed(false);
    setStreak(0);
    resetCurrentStreak(uid, DIFFICULTY);
    setGuess("");
    setMessage("");
    loadRandomPokemon();
  };

  return (
    <div id="pokemon-container2">
      {pokemon && (
        <div className="pokemon-card2">

        <p>STREAK: 🔥{streak}</p>

        <div id="link-container" >
            <NavLink to="/easy">Easy</NavLink>
            <NavLink to="/normal">Normal</NavLink>
            <NavLink to="/hard">Hard</NavLink>
            <NavLink to="/impossible">Impossible</NavLink>
          </div> 

            <img 
              src={pokemon.sprites.back_default} 
              alt={pokemon.name} 
              className="pokemon-image"
            />

          <input
            type="text"
            value={guess}
            placeholder="Enter your guess here..."
            onChange={(e) => setGuess(e.target.value)}
          />

        <div id="card-btn2"> 
          <button onClick={handleGuess} disabled={revealed} ><i class="fa-solid fa-square-check"></i> Submit</button>
          <button onClick={skip} disabled={revealed} ><i class="fa-solid fa-forward"></i> Skip It</button>
        </div>

          <p>{message}</p>

          {revealed && (  
              <button id="next2" onClick={playAgain}> <i class="fa-solid fa-circle-arrow-right"></i> Next Pokemon!</button>
          )}

        </div>
      )}

      <RankingCard></RankingCard>
    </div>
  );
}

export default PokemonCardNormal;

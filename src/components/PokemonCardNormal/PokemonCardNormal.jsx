import { useEffect, useState } from "react";
import "./pokemon-card-normal.css";
import { NavLink } from "react-router";

function PokemonCardNormal() {

  const [pokemon, setPokemon] = useState(null);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [streak, setStreak] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    loadRandomPokemon();
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

      setStreak(prev => prev + 1);
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
            <NavLink to="/easy" onClick={() => setOpen(false)}>Easy</NavLink>
            <NavLink to="/normal" onClick={() => setOpen(false)}>Normal</NavLink>
            <NavLink to="/hard" onClick={() => setOpen(false)}>Hard</NavLink>
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
          <button onClick={handleGuess} disabled={revealed} >Submit</button>
          <button onClick={skip} disabled={revealed} >Skip It</button>
        </div>

          <p>{message}</p>

          {revealed && (  
              <button id="next1" onClick={playAgain}>Next Pokemon!</button>
          )}

        </div>
      )}
    </div>
  );
}

export default PokemonCardNormal;

import React, { useState } from 'react';
import Move from './Move';
import './App.css';

const App = () => {
  const [pokemonId, setPokemonId] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState('');

  const fetchPokemonData = async (id) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!response.ok) {
        throw new Error('Pokémon not found.');
      }
      const data = await response.json();
      setPokemonData(data);
      setError('');
    } catch (err) {
      setError(err.message);
      setPokemonData(null);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setPokemonId(value);
    if (value === '') {
      setPokemonData(null);
      setError('');
    }
  };

  const handleFetchPokemon = () => {
    if (pokemonId) fetchPokemonData(pokemonId);
  };

  const handleClear = () => {
    setPokemonId('');
    setPokemonData(null);
    setError('');
  };

  return (
    <div className="App">
      <h1>Pokémon Character Viewer</h1>
      <div className="input-container">
        <input
          type="number"
          placeholder="Enter Pokémon ID"
          value={pokemonId}
          onChange={handleInputChange}
        />
        <button onClick={handleFetchPokemon}>Fetch Pokémon</button>
        <button onClick={handleClear}>Clear</button>
      </div>

      {error && <p className="error">{error}</p>}

      {pokemonData && (
        <div className="pokemon-info">
          <h2 className="pokemon-name">{pokemonData.name}</h2>
          <div className="sprites">
            <img src={pokemonData.sprites.front_default} alt="Front" />
            <img src={pokemonData.sprites.back_default} alt="Back" />
            <img src={pokemonData.sprites.front_shiny} alt="Shiny Front" />
          </div>
          <h3>Moves:</h3>
          <div className="moves">
            {pokemonData.moves.slice(0, 3).map((move, index) => (
              <Move key={index} name={move.move.name} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

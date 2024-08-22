import React, { useEffect, useState } from 'react';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
        const data = await response.json();
        setPokemons(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPokemons();
  }, []);

  const getPokemonId = (url) => {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 2];
  };

  return (
    <div className="App p-4">
      <h1 className="text-3xl cursor-pointer font-serif font-bold text-center mb-8">Pokémon List</h1>
      <input 
        type="text" 
        placeholder="Search Pokémon..." 
        className="block w-full p-2 border border-sky-500 rounded mb-8"
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} 
      />
      <div className="grid px-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
        {pokemons
          .filter(pokemon => pokemon.name.includes(searchTerm))
          .map((pokemon) => {
            const pokemonId = getPokemonId(pokemon.url);
            return (
              <div key={pokemonId} className="pokemon-card cursor-pointer hover:scale-105 hover:shadow-[6px_6px_10px_rgba(0,0,0,0.3)] p-4 transition-all ease-linear 0.5s bg-white shadow-lg rounded-md text-center">
                <h2 className="text-xl font-semibold mb-2">{pokemon.name}</h2>
                <img 
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`} 
                  alt={pokemon.name} 
                  className="mx-auto w-28"
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;

class Pokedex {
  constructor() {
    this.pokemons = [];
  }
  add(pokemon) {
    if (pokemon.name !== "" && this.fetch(pokemon.name) === null) {
      this.pokemons[this.pokemons.length] = pokemon;
    }
  }
  delete(pokemonName) {
    let deleteIndex = -1;
    for (let i = 0; i < this.pokemons.length; i++) {
      let currentPokemon = this.pokemons[i];
      if (isPokemon(currentPokemon, pokemonName)) {
        deleteIndex = i;
        break;
      }
    }
    if (deleteIndex !== -1) {
      this.pokemons.splice(deleteIndex, 1);
    }
  }
  fetch(pokemonName) {
    for (let i = 0; i < this.pokemons.length; i++) {
      let currentPokemon = this.pokemons[i];
      if (isPokemon(currentPokemon, pokemonName)) {
        return currentPokemon;
      }
    }
    return null;
  }
  list() {
    return this.pokemons;
  }
  update(pokemonName, newPokemon) {
    let updateIndex = -1;
    for (let i = 0; i < this.pokemons.length; i++) {
      let currentPokemon = this.pokemons[i];
      if (isPokemon(currentPokemon, pokemonName)) {
        updateIndex = i;
        break;
      }
    }
    if (updateIndex !== -1) {
      this.pokemons[updateIndex] = newPokemon;
    }
  }
}

function isPokemon(pokemon, pokemonName) {
  return pokemon.name.toLowerCase() === pokemonName.toLowerCase();
}

export default Pokedex;

class Pokedex {
  constructor() {
    this.pokemons = [];
  }
  add(pokemonName) {
    if (pokemonName !== "" && this.fetch(pokemonName) === "") {
      this.pokemons[this.pokemons.length] = capitalizeFirstLetter(pokemonName);
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
      delete this.pokemons[deleteIndex];
    }
  }
  fetch(pokemonName) {
    for (let i = 0; i < this.pokemons.length; i++) {
      let currentPokemon = this.pokemons[i];
      if (isPokemon(currentPokemon, pokemonName)) {
        return currentPokemon;
      }
    }
    return "";
  }
  list() {
    return this.pokemons;
  }
  update(pokemonName) {
    let updateIndex = -1;
    for (let i = 0; i < this.pokemons.length; i++) {
      let currentPokemon = this.pokemons[i];
      if (isPokemon(currentPokemon, pokemonName)) {
        updateIndex = i;
        break;
      }
    }
    if (updateIndex !== -1) {
      this.pokemons[updateIndex] = pokemonName;
    }
  }
}

function isPokemon(pokemon, pokemonName) {
  return pokemon.toLowerCase() === pokemonName.toLowerCase();
}

function capitalizeFirstLetter(str) {
  if (!str) return str;
  const firstChar = str.charAt(0);
  return firstChar === firstChar.toUpperCase()
    ? str
    : firstChar.toUpperCase() + str.substring(1);
}

export default Pokedex;

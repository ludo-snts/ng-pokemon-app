import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon'; // Importe la classe Pokemon
import { POKEMONS } from './mock-pokemon-list'; // Importe la liste de Pokémons

@Injectable()
export class PokemonService {

  // Retourne une liste de Pokémons
  getPokemonList(): Pokemon[] {
    return POKEMONS;
  }

  // Retourne le pokémon avec l'identifiant passé en paramètre
  getPokemonById(pokemonId: number) : Pokemon|undefined{
    return POKEMONS.find(pokemon => pokemon.id == pokemonId);
  }

  // Retourne les types d'un pokémon
  getPokemonTypeList(): string[] {
    return [
      'Plante', 
      'Feu', 'Eau', 
      'Insecte', 
      'Normal', 
      'Electrik', 
      'Poison', 
      'Fée', 
      'Vol', 
      'Combat', 
      'Psy'
    ];
  }
}

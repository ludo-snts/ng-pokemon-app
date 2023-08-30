import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';
import { PokemonService } from '../pokemon.service';


@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',

})
export class ListPokemonComponent implements OnInit{
  pokemonList: Pokemon[];

  constructor(
    private router : Router,
    private pokemonService: PokemonService
    ) { 

  }

  // Accède à la liste des Pokémons au chargement du composant

  ngOnInit() {
    this.pokemonService.getPokemonList()
      .subscribe(pokemonList => this.pokemonList = pokemonList); // On récupère la liste des Pokémons par abonement à l'observable
  }

  goToPokemon(pokemon: Pokemon) {
    this.router.navigate(['/pokemon', pokemon.id]); 
  }
}
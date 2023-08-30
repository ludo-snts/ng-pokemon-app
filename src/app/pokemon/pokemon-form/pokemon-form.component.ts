import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css']
})
export class PokemonFormComponent implements OnInit {
  @Input() pokemon: Pokemon;
  types: string[];
  isAddForm: boolean;

  constructor(
    private pokemonService : PokemonService,
    private router: Router
    ) { }

  // Tous les types disponibles pour un pokémon
  ngOnInit() {
    this.types = this.pokemonService.getPokemonTypeList();
    this.isAddForm = this.router.url.includes('add');
  }

  // Recupere les types du pokemon
  hasType(type: string,): boolean {
    return this.pokemon.types.includes(type);  
  }

  // Verifie si le type est deja selectionné
  selectType($event: Event, type: string) {
    const isChecked: boolean = ($event.target as HTMLInputElement).checked;

    if(isChecked) { // Si le type est coché
      this.pokemon.types.push(type);
    } else { // Si le type est décoché
      const index = this.pokemon.types.indexOf(type); // Recupere l'index du type dans le tableau
      this.pokemon.types.splice(index, 1);
    }
  }

  // Valide le nombre de types pour chaque pokémon
  isTypesValid(type: string): boolean {
    // Si le nombre de types est égal à 1 et que le type est déjà sélectionné
    if(this.pokemon.types.length == 1 && this.hasType(type)) {
      return false;
    }
    // Si le nombre de types est supérieur à 2 et que le type n'est pas déjà sélectionné
    if(this.pokemon.types.length > 2 && !this.hasType(type)) {
      return false;
    }

    return true;
  }


  onSubmit() {
    if(this.isAddForm) {
      this.pokemonService.addPokemon(this.pokemon)
      // Redirige vers la page du nouveau pokémon
        .subscribe((pokemon: Pokemon) => this.router.navigate(['/pokemon', pokemon.id]));
    } else {
      // Redirige vers la page du pokémon modifié
      this.pokemonService.updatePokemon(this.pokemon)
        .subscribe(() => this.router.navigate(['/pokemon', this.pokemon.id]));
    }
  }
  
}

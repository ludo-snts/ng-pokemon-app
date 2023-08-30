import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, Observable, Subject, switchMap } from 'rxjs';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
})
export class SearchPokemonComponent implements OnInit {
  // flux de termes de recherche (observable) dans le temps
  searchTerms = new Subject<string>(); // Subject est un type de Observable qui permet de publier des valeurs (ici des termes de recherche) sur un flux de données
  // $ est une convention pour indiquer que la variable est un Observable (flux de données)
  pokemons$: Observable<Pokemon[]>; // Observable de tableau de pokémons (flux de données) en réactif

  constructor(
    private router: Router,
    private pokemonService: PokemonService
    ) { }

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      // {...."ab"..."abz"."ab"...."abc"......}
      debounceTime(300),
      // {......"ab"...."ab"...."abc"......}
      distinctUntilChanged(),
      // {......"ab"..........."abc"......}
      switchMap((term) => this.pokemonService.searchPokemonList(term))
      // {.....pokemonList(ab)............pokemonList(abc)......}
      // switchMap permet de ne garder que le dernier Observable (flux de données) émis par searchPokemonList
      // et d'annuler les précédents (pour éviter les résultats dans le désordre)
      // il existe aussi mergeMap, concatMap et exhaustMap (voir https://blog.angular-university.io/rxjs-higher-order-mapping/)
    );
  }

  search(term: string) {
    this.searchTerms.next(term); // publie le terme de recherche dans le flux de données
  }

  goToDetail(pokemon: Pokemon) {
    const link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }

}
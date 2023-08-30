import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Pokemon } from './pokemon'; // Importe la classe Pokemon


@Injectable()
export class PokemonService {

  constructor(private http: HttpClient) {}

  // Retourne une liste de Pokémons depuis l'api de in-memory-data.service.ts (CRUD READ ALL)
  getPokemonList(): Observable<Pokemon[]> { 
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  // Retourne le pokémon avec l'identifiant passé en paramètre (CRUD READ ONE)
  getPokemonById(pokemonId: number): Observable<Pokemon|undefined> {
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  // Modification d'un pokémon via l'API (CRUD UPDATE)
  updatePokemon(pokemon: Pokemon): Observable<null> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.put('api/pokemons', pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  // Ajout d'un pokémon via l'API (CRUD CREATE)
  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<Pokemon>('api/pokemons', pokemon, httpOptions).pipe( 
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  // Supprimer un pokémon via l'API (CRUD DELETE)
  deletePokemonById(pokemonId: number): Observable<null> {
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }
  
  // log de  la réponse de l'API (factorisation)
  private log(response: any) {
    console.table(response);
  }

  // Gestion des erreurs de l'API (factorisation)
  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
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

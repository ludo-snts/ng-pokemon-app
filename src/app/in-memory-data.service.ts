import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { POKEMONS } from './pokemon/mock-pokemon-list';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    // on ne peu pas passer directement POKEMONS car il faut un objet avec une propriété pokemons et non un tableau de pokemons comme dans POKEMONS
      const pokemons = POKEMONS;
      return { pokemons };
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PokemonModule } from './pokemon/pokemon.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    PokemonModule, // Relie le module Pokemon au module racine
    AppRoutingModule // A la fin pour éviter les conflits de routes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

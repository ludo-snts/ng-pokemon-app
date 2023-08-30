import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PokemonModule } from './pokemon/pokemon.module';
import { InMemoryDataService } from './in-memory-data.service';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // Pour utiliser [(ngModel)] dans les templates 
    HttpClientModule, // Pour utiliser le service HttpClient
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService,  { dataEncapsulation: false }), // Pour intercepter les requêtes HTTP
    PokemonModule, // Relie le module Pokemon au module racine
    AppRoutingModule // A la fin pour éviter les conflits de routes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

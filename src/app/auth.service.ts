import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false; // L'utilisateur est-il connecté ? (false au départ)
  redirectUrl: string; // où rediriger l'utilisateur après l'authentification ? (page demandée avant l'authentification)

  login(name: string, password: string): Observable<boolean> { 
    const isLoggedIn = (name == 'pikachu' && password == 'pikachu'); // User/Password en "dur" pour l'exemple

    return of(isLoggedIn).pipe(
      delay(1000), // Simule un appel réseau de 1000 ms (1 seconde)
      tap(isLoggedIn => this.isLoggedIn = isLoggedIn) // Modifie le statut de connexion (isLoggedIn)
    );
  }

  logout() {
    this.isLoggedIn = false; // Déconnexion de l'utilisateur (isLoggedIn à false)
  }
}
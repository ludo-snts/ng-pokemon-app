import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService, // Injecte le service AuthService
    private router: Router // Injecte le service Router
  ) {}

  canActivate(): boolean { // Méthode qui renvoie un booléen de manière synchrone
    if(this.authService.isLoggedIn) { // Si l'utilisateur est connecté (isLoggedIn vaut true dans le service AuthService)
      return true; // Autorise l'accès à la route
    }

    this.router.navigate(['/login']); // Redirige vers la route /login si l'utilisateur n'est pas connecté (isLoggedIn vaut false dans le service AuthService)
    return false; // Bloque l'accès à la route
  }
}
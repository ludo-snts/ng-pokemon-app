import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  message: string = 'Vous êtes déconnecté. (indice : pikachu/pikachu)'; // Message d'erreur à afficher
  name: string; // Nom d'utilisateur saisi dans l'input
  password: string; // Mot de passe saisi dans l'input
  auth: AuthService; // Service d'authentification

  constructor(
    private authService: AuthService, // Injecte le service AuthService
    private router: Router // Injecte le service Router
  ) { }

  ngOnInit() {
    this.auth = this.authService; // Récupère le service d'authentification (car utilisé dans le template directement)
  }

  setMessage() { // Définit le message à afficher en fonction du statut d'authentification
    if(this.auth.isLoggedIn) { // Si l'utilisateur est connecté
      this.message = 'Vous êtes connecté.';
    } else { // Si l'utilisateur n'est pas connecté
      this.message = 'Indentifiant ou mot de passe incorrect.'
    }
  }

  login() { // Méthode appelée lorsque l'utilisateur clique sur le bouton "Connexion"
    this.message = 'Tentative de connexion en cours...';
    this.auth.login(this.name, this.password) // Appelle la méthode login du service AuthService
      .subscribe((isLoggedIn: boolean) => { // Souscrit à l'Observable renvoyé par la méthode login du service AuthService
        this.setMessage(); // Définit le message à afficher
        if(isLoggedIn) { // Si l'utilisateur est connecté
          this.router.navigate(['/pokemons']); // Redirige vers la page d'accueil
        } else { // Si l'utilisateur n'est pas connecté
          this.password = ''; // Réinitialise le mot de passe
          this.router.navigate(['/login']); // Redirige vers la page de connexion
        }
      })
  }

  logout() {
    this.auth.logout(); // Appelle la méthode logout du service AuthService
    this.message = 'Vous êtes déconnecté.';
  }

}
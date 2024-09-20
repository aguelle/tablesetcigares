import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FirestoreService } from '../firestore.service';
import { User } from '@angular/fire/auth';
import { UserModel } from '../user.model'; // Importer l'interface
import { EventFormComponent } from '../event-form/event-form.component'; // Assurez-vous d'importer le composant


@Component({
  selector: 'app-protected',
  standalone: true,
  imports: [CommonModule, EventFormComponent],
  templateUrl: './protected.component.html',
  styleUrl: './protected.component.css'
})
export class ProtectedComponent {
  cigars: any[] = [];
  title = 'cigar-club-app';
  user: UserModel | null = null;
  isAdmin: boolean = false;
  showEventForm: boolean = false;

  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.firestoreService.getCigars().subscribe((data) => {
      this.cigars = data;
      console.log(this.cigars);
    });
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
      if (user) {
        this.authService.getUserRole(user.uid).then(role => {
          this.isAdmin = role === 'admin'; // Vérifie le rôle
          console.log('User role:', role); // Ajoute un log pour déboguer
        });
      }
    });
  }

  logout() {
    this.authService.signOut().then(() => {
      console.log('User signed out');
      this.router.navigate(['/login']);
    }).catch(error => {
      console.error('Error signing out', error);
    });
  }

  toggleEventForm() {
    this.showEventForm = !this.showEventForm;
  }
}

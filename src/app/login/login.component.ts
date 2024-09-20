import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importer FormsModule
import { AuthService } from '../auth.service'
import { Router } from '@angular/router'; // Importer le Router
import { GoogleLoginComponent } from './google-login/google-login.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, GoogleLoginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string ='';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.signIn(this.email, this.password).then(() => {
      console.log('User signed in');
      this.router.navigate(['/protected']);
    }).catch(error => {
      console.error('Error signing in', error);
    });
  }




  logout() {
    this.authService.signOut().then(() => {
      console.log('User signed out');
    }).catch(error => {
      console.error('Error signing out', error);
    });
  }
}

import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-google-login',
  standalone: true,
  imports: [],
  templateUrl: './google-login.component.html',
  styleUrl: './google-login.component.css'
})
export class GoogleLoginComponent {

  constructor(private authService: AuthService, private router: Router) {}

  loginWithGoogle() {
    this.authService.signInWithGoogle().then(() => {
      console.log('User signed in with Google');
      this.router.navigate(['/protected']);
    }).catch(error => {
      console.error('Error signing in with Google', error);
    });
  }
}

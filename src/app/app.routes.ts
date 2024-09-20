import { Routes } from '@angular/router';
import { LoginComponent } from '../app/login/login.component'; 
import { HomeComponent } from '../app/home/home.component';
import { AuthGuard } from './auth.guard'; // Importer le garde d'authentification
import { ProtectedComponent } from './protected/protected.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'login', component: LoginComponent }, 
  { path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] } 
];

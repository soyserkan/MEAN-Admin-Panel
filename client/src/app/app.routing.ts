import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { AuthGuard } from './pages/auth/auth.guard';


export const AppRoutes: Routes = [
  // {
  //   path: '', redirectTo: 'dashboard', pathMatch: 'full',
  // },
  { path: '', component: AdminLayoutComponent, children: [{ path: '', loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule' }], canActivate: [AuthGuard] },
  // { path: '**', redirectTo: 'dashboard' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
]

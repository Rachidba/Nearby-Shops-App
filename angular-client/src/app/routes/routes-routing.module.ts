import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { ShopsComponent } from '../shops/shops.component';
import { PreferredShopsComponent } from '../preferred-shops/preferred-shops.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { LoginGuardService } from '../services/login-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginGuardService]},
  { path: 'register', component: RegisterComponent, canActivate: [LoginGuardService]},
  { path: 'shops', component: ShopsComponent, canActivate: [AuthGuardService] },
  { path: 'preferred-shops', component: PreferredShopsComponent, canActivate: [AuthGuardService] },
  { path: '', redirectTo: '/shops', pathMatch: 'full'},
  { path: '**', redirectTo: '/shops', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }

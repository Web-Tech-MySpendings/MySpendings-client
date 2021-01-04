import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SaldoComponent } from './saldo/saldo.component';
import { AddSpendingComponent } from './add-spending/add-spending.component';
import { ViewComponent } from './view/view.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'view', component: ViewComponent },
  { path: 'add', component: AddSpendingComponent }, //just for test purpose
  { path: 'profile', component: ProfileComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

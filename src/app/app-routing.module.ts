import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SaldoComponent } from './saldo/saldo.component';

const routes: Routes = [
{path:'', component: LoginComponent},
//{path:'register', component: RegisterComponent}
{path:'saldo', component: SaldoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



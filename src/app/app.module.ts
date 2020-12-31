import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';

import {HttpClientModule} from '@angular/common/http';

//Design imports: 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SaldoComponent } from './saldo/saldo.component';
import { RegisterComponent } from './register/register.component';
import { AddSpendingComponent } from './add-spending/add-spending.component';

import { CommonModule, CurrencyPipe} from '@angular/common';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { CookieService } from 'ngx-cookie-service';
import { ViewComponent } from './view/view.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SaldoComponent,
    RegisterComponent,
    AddSpendingComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule

  ],
  providers: [
    CurrencyPipe,
    CookieService 
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {

  

}

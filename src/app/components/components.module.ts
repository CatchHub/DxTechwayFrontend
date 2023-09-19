import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddproductComponent } from './products/add-products/add-products.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { productsModule } from './products/products.module';
import { productsComponent } from './products/products.component';



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    productsModule,
    ReactiveFormsModule
  ],
  exports:[productsComponent,LoginComponent,SignupComponent]
})
export class ComponentsModule { }

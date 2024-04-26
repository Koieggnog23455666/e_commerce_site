import { NgModule, ɵisEnvironmentProviders } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { LayoutComponent } from './pages/admin/layout/layout.component';
import { CategoryComponent } from './pages/admin/category/category.component';
import { CustomerComponent } from './pages/admin/customer/customer.component';
import { OrderComponent } from './pages/admin/order/order.component';
import { ProductsComponent } from './pages/admin/products/products.component';
import { CategoryProductsComponent } from './pages/website/category-products/category-products.component';
import { CheckoutComponent } from './pages/website/checkout/checkout.component';
import { CustomerCartComponent } from './pages/website/customer-cart/customer-cart.component';
import { CustomerOrderComponent } from './pages/website/customer-order/customer-order.component';
import { LandingComponent } from './pages/website/landing/landing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ROUTES, RouterLink,  RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import {  HttpClientModule, provideHttpClient, } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogPopUpComponent } from './pages/admin/products/dialog-pop-up/dialog-pop-up.component'
import {MatFormField} from '@angular/material/form-field'
import {MatSelect,MatOption} from '@angular/material/select';
import { WebProductComponent } from './pages/website/web-product/web-product.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignUpComponent } from './pages/admin/sign-up/sign-up.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    CategoryComponent,
    CustomerComponent,
    OrderComponent,
    ProductsComponent,
    CategoryProductsComponent,
    CheckoutComponent,
    CustomerCartComponent,
    CustomerOrderComponent,
    LandingComponent,
    DialogPopUpComponent,
    WebProductComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,MatDialogModule,
    FontAwesomeModule,CommonModule,HttpClientModule,MatFormField,MatSelect,MatOption,
    
  ],
  providers: [
   provideHttpClient(),provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

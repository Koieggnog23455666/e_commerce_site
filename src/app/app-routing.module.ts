import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/admin/login/login.component';
import { LayoutComponent } from './pages/admin/layout/layout.component';
import { ProductsComponent } from './pages/admin/products/products.component';
import { CategoryComponent } from './pages/admin/category/category.component';
import { LandingComponent } from './pages/website/landing/landing.component';
import { CategoryProductsComponent } from './pages/website/category-products/category-products.component';
import { WebProductComponent } from './pages/website/web-product/web-product.component';
import { SignUpComponent } from './pages/admin/sign-up/sign-up.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'shop',
    pathMatch:'full'
  },
  {
    path:"sign-up",
    component:SignUpComponent
  },
  {
    path:'category',
    component:CategoryComponent
  },
  {
    path:'',
    component:LandingComponent,
    children:[
      {
        path:'AllProducts',
        component:WebProductComponent
      },
      {
        path:'products/:id',
        component:CategoryProductsComponent
      },
    ]
  },
 
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'',
    component:LayoutComponent,
    children:[
      {
        path:'products',
        component:ProductsComponent
      },
      {
        path:'category',
        component:CategoryComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

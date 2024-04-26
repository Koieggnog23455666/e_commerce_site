import { Component, ElementRef, OnInit } from '@angular/core';
import { category, productType } from '../../../interface';
import { ProductService } from '../../../service/product/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent  {
  categoryList:category[]=[]
  isDropdownOpen = false;
  cartList:any[]=[]
  constructor(private productSrv:ProductService,private routes:Router,private elementRef:ElementRef){this.getAllCategory()}
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
 

  getAllCategory(){
    this.productSrv.getCategory().subscribe((res:any)=>{
      this.categoryList=res.data
    })
  }
  navigateToProducts(id:number){
    this.routes.navigate(['/products',id])
  }
  getCartbyCustomer(){
    this.productSrv.getDataCartByCustId(383).subscribe((res:any)=>{
      this.cartList=res.data
    })
  }
 
}

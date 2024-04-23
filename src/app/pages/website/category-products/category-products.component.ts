import { Component } from '@angular/core';
import { ProductService } from '../../../service/product/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.css'
})
export class CategoryProductsComponent {
  loadProduct:any[]=[]
  activeCategoryId:number=0
 constructor(private productSrv:ProductService,private activatedRoute:ActivatedRoute){
  this.activatedRoute.params.subscribe((res:any)=>{
    this.activeCategoryId=res.id
    this.getProductByCategory()
    
  })
}

 getProductByCategory(){
  this.productSrv.getProductByCategoryId(this.activeCategoryId).subscribe((res:any)=>{
this.loadProduct=res.data
  })
 }
}

import { Component, OnInit } from '@angular/core';
import { productType } from '../../../interface';
import { ProductService } from '../../../service/product/product.service';

@Component({
  selector: 'app-web-product',
  templateUrl: './web-product.component.html',
  styleUrl: './web-product.component.css'
})
export class WebProductComponent implements OnInit {
  productList:productType[]=[]
  categoryList:productType[]=[]
  constructor(private productSrv:ProductService){this.getAllProduct(),this.getAllCategory()}
  ngOnInit(): void {
    this.getAllProduct()
    this.getAllCategory()
    
  }
  
  getAllCategory(){
    this.productSrv.getCategory().subscribe((res:any)=>{
      this.categoryList=res.data
    })
  }
  getAllProduct() {
    this.productSrv.getProduct().subscribe((res: any) => {
      this.productList = res.data
    })
  }
}

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
  addToCart(productId:number){
   const addToCartObj={
      "CartId": 0,
      "CustId": 383,
      "ProductId": productId,
      "Quantity": 0,
      "AddedDate": "2024-04-25T15:28:32.694Z"
    }
    this.productSrv.addToCart(addToCartObj).subscribe((res:any)=>{
      if(res.result){
        alert('Product Added to Cart')
      }
      else{
        alert(res.message)
      }
    })
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

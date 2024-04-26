import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../../service/product/product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { category, productType } from '../../../interface';
import { MatDialog } from '@angular/material/dialog';
import { DialogPopUpComponent } from './dialog-pop-up/dialog-pop-up.component';
import e from 'express';
import {FormsModule} from '@angular/forms'
import { Position } from 'popper.js';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  isSidePanelVisible: boolean = false;
  categoryList: category[] = [];
  mode: string = "Add";//add or edit mode
  productList: productType[] = [];
  name:string='krishna'
  productObj: productType[]=[]
  basket:any
  filteredProductList: productType[] = [];
  searchText: string = '';
  
  constructor(private productSrv: ProductService,private dialogRef:MatDialog) { 
    this.getAllProduct()
    this.productSrv.searchQuery$.subscribe(query => {
      this.searchText = query;
      this.searchProducts();
    });
  }
  searchProducts() {
    if (!this.searchText.trim()) {
      this.filteredProductList = this.productList;
    }
    else {
      this.filteredProductList = this.productList.filter(product =>
        product.productName.toLowerCase().includes(this.searchText.trim().toLowerCase())
      );
    }
  }

  ngOnInit(): void {
    this.getAllCategory()
    this.getAllProduct()
    
    // this.productSrv.getProductNames().subscribe((products)=>{
      //   this.searchProduct=products
      // })
    }

  openDialog(){

  // this.mode=='Add'
    this.dialogRef.open(DialogPopUpComponent,{
      
      data:{basket:this.productList},
      
      width:'650px'
      
    })
  this.getProductByName()
  
  }
  updateDialog(product: productType) {
    this.dialogRef.open(DialogPopUpComponent, {
      data:{basket:product,updatedProduct:this.getAllProduct()},width:'700px',
    }
    
  );
  console.log("Before update",product)
  }
  
  getAllCategory() {
    this.productSrv.getCategory().subscribe((res: any) => {
      this.categoryList = res.data
    })
  }

  getAllProduct() {
    this.productSrv.getProduct().subscribe((res: any) => {
      this.productList = res.data
      this.filteredProductList = this.productList;

      // this.getProductByName()
     
    })
  }
  
  getProductByName() {
    let p2=this.productSrv.searchList
    const searchResult=this.productList.filter((each)=>each.productName.toLowerCase().includes(p2))
    this.productList=searchResult
    console.log(this.productList)
   }
 
  onDelete(item: any) {
    const isDelete = confirm("Are you sure to delete this item");
    if (isDelete) {
      this.productSrv.deleteProduct(item.productId).subscribe((res: any) => {
        if (res.result) {
          alert('Product Deleted')
          this.getAllProduct()
        }
        else {
          alert(res.message);
        }
      })
    }

  }
  isNewSidePanel() {
    this.isSidePanelVisible = true
  }
  isCloseSidePanel() {
    this.isSidePanelVisible = false
  }
  
}

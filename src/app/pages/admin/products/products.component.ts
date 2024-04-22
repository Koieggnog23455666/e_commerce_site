import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../../service/product/product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { category, productType } from '../../../interface';
import { MatDialog } from '@angular/material/dialog';
import { DialogPopUpComponent } from './dialog-pop-up/dialog-pop-up.component';


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
  constructor(private productSrv: ProductService,private dialogRef:MatDialog) { }
  ngOnInit(): void {
    this.getAllCategory()
    this.getAllProduct()
  }

  openDialog(){
    
  // this.mode=='Add'
    this.dialogRef.open(DialogPopUpComponent,{
      
      data:{basket:this.productList},
      
      width:'700px'
      
    })
  }
  updateDialog(product: productType) {
    

    this.dialogRef.open(DialogPopUpComponent, {
      data:{basket:product,isUpdate:true},width:'700px',
    });
    this.getAllProduct()
  }
  
  getAllCategory() {
    this.productSrv.getCategory().subscribe((res: any) => {
      this.categoryList = res.data
    })
  }

  getAllProduct() {
    this.productSrv.getProduct().subscribe((res: any) => {
      this.productList = res.data
    })
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
  // onEdit(product:product) {
    
  //   this.isSidePanelVisible = true;

  //   this.mode="Update";
  //   console.log(product)
  // }
  
  // reset(){
  //   this.productForm.reset()
  //   this.mode="Add"
  // }
}

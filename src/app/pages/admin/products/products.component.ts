import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product/product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { category, product } from '../../../interface';
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
  productList: product[] = [];
  name:string='krishna'
  productObj: product[]=[]

  
  constructor(private productSrv: ProductService,private dialogRef:MatDialog) { }
  ngOnInit(): void {
    this.getAllCategory()
    this.getAllProduct()
  }
  
  openDialog(){

    this.dialogRef.open(DialogPopUpComponent,{
      data:this.name
    })
  }
  getAllCategory() {
    this.productSrv.getCategory().subscribe((res: any) => {
      this.categoryList = res.data
    })
  }
  checkMode(): string {
    return this.mode === 'Add' ? 'Add' : 'Update';
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
  onEdit(product:product) {
    
    this.isSidePanelVisible = true;
    // this.productForm.get('productId')?.setValue(product.productId)
    // this.productForm.get('sku')?.setValue(product.productSku)
    // this.productForm.get('name')?.setValue(product.productName)
    // this.productForm.get('shortName')?.setValue(product.productShortName)
    // this.productForm.get('price')?.setValue(product.productPrice)
    // this.productForm.get('description')?.setValue(product.productDescription)
    // this.productForm.get('categoryId')?.setValue(product.categoryId)
    // this.productForm.get('deliveryTimeSpan')?.setValue(product.deliveryTimeSpan)
    // this.productForm.get('imageURL')?.setValue(product.productImageUrl)
    this.mode="Update";
    console.log(product)
  }
  
  // reset(){
  //   this.productForm.reset()
  //   this.mode="Add"
  // }
}

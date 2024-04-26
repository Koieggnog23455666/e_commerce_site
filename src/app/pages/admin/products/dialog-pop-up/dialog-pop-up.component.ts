import { Component,EventEmitter,Inject,Input,InputDecorator,OnInit,Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsComponent } from '../products.component';
import { ProductService } from '../../../../service/product/product.service';
import { productType } from '../../../../interface';
import { log } from 'console';
interface category{
  categoryName:string,
  categoryId:string
}
@Component({
  selector: 'app-dialog-pop-up',
  templateUrl: './dialog-pop-up.component.html',
  styleUrl: './dialog-pop-up.component.css'
})
export class DialogPopUpComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private productSrv: ProductService,public dialogRef: MatDialogRef<DialogPopUpComponent>){
    this.productObj=this.data
    const getProduct = {
     productId: this.productForm.get('productId')?.setValue(data.basket.productId),
     productSku: this.productForm.get('sku')?.setValue(data.basket.productSku),
     productName: this.productForm.get('name')?.setValue(data.basket.productName),
     productPrice: this.productForm.get('price')?.setValue(data.basket.productPrice),
     productShortName: this.productForm.get('shortName')?.setValue(data.basket.productShortName),
     productDescription: this.productForm.get('description')?.setValue(data.basket.productDescription),
     deliveryTimeSpan: this.productForm.get('deliveryTimeSpan')?.setValue(data.basket.deliveryTimeSpan),
     categoryId: this.productForm.get('categoryId')?.setValue(data.basket.categoryId),
     productImageUrl: this.productForm.get('imageURL')?.setValue(data.basket.productImageUrl)
    };
    this.getAllProduct()
  }
   
  ngOnInit(): void {
    this.getAllCategory()
    this.getAllProduct()
  }
  productList:any[]=[]
  productObj: productType={
    'productId': 0,
    'productSku': '',
    'productName': '',
    'productShortName': '',
    'productPrice': '',
    'productDescription':'' ,
    'createdDate': new Date(),
    'deliveryTimeSpan':'' ,
    'categoryId': '',
    'productImageUrl':'' ,
    'categoryName':'',
  }

@ Input() categoryList:category[]=[]



productForm = new FormGroup({
  productId:new FormControl(''),
  sku: new FormControl('', [Validators.required]),
  name: new FormControl('', [Validators.required]),
  shortName: new FormControl('', [Validators.required]),
  price: new FormControl('', [Validators.required]),
  categoryId: new FormControl('', [Validators.required]),
  deliveryTimeSpan: new FormControl('', [Validators.required]),
  imageURL: new FormControl('', [Validators.required]),
  description: new FormControl('', [Validators.required]),
});

onSave() {
  const createProduct = {
    productSku: this.productForm.get('sku')?.value,
    productName: this.productForm.get('name')?.value,
    productPrice: this.productForm.get('price')?.value,
    productShortName: this.productForm.get('shortName')?.value,
    productDescription: this.productForm.get('description')?.value,
    deliveryTimeSpan: this.productForm.get('deliveryTimeSpan')?.value,
    categoryId: this.productForm.get('categoryId')?.value,
    productImageUrl: this.productForm.get('imageURL')?.value
  };
  console.log(this.productForm.get('sku')?.value,)
  // this.isSidePanelVisible=false;
  this.productSrv.saveProduct(createProduct).subscribe((res: any) => {
    if (res.result) {
      alert('Product Created')
      this.productForm.reset()
      this.productForm.get('categoryId')?.reset()
      this.productForm.get('deliveryTimeSpan')?.reset()
      this.getAllProduct()
      // this.isSidePanelVisible=true
  
    }
    else {
      alert(res.message);
    }
    
  })
  this.dialogRef.close();
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
updateProduct() {
  const updatedProduct = {
    productId: this.productForm.get('productId')?.value,
    productSku: this.productForm.get('sku')?.value,
    productName: this.productForm.get('name')?.value,
    productPrice: this.productForm.get('price')?.value,
    productShortName: this.productForm.get('shortName')?.value,
    productDescription: this.productForm.get('description')?.value,
    deliveryTimeSpan: this.productForm.get('deliveryTimeSpan')?.value,
    categoryId: this.productForm.get('categoryId')?.value,
    productImageUrl: this.productForm.get('imageURL')?.value
  };

  this.productSrv.updateProduct(updatedProduct).subscribe((res: any) => {
    if (res.result) {
      alert('Product Updated')
      this.productForm.reset()
      this.getAllProduct()
console.log("After update",updatedProduct)
    }
    else {
      alert(res.message);
    }
  })
  this.data.updatedProduct
  this.dialogRef.close();
}
}

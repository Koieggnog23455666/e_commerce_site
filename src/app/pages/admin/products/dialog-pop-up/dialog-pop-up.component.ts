import { Component,Inject,Input,InputDecorator,OnInit,Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsComponent } from '../products.component';
import { ProductService } from '../../../../service/product/product.service';
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
  ngOnInit(): void {
    this.getAllCategory()
  
  }
@ Input() categoryList:category[]=[]

constructor(@Inject(MAT_DIALOG_DATA) public data: any, private productSrv: ProductService){
  console.log(data)
}
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
  // this.isSidePanelVisible=false;
  this.productSrv.saveProduct(createProduct).subscribe((res: any) => {
    if (res.result) {
      alert('Product Created')
      // this.getAllProduct()
      this.productForm.reset()
      this.productForm.get('categoryId')?.reset()
      this.productForm.get('deliveryTimeSpan')?.reset()
      // this.isSidePanelVisible=true
      console.log(res.result)
    }
    else {
      alert(res.message);
    }
    
  })
}
getAllCategory() {
  this.productSrv.getCategory().subscribe((res: any) => {
    this.categoryList = res.data
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
  console.log(updatedProduct)
  this.productSrv.updateProduct(updatedProduct).subscribe((res: any) => {
    if (res.result) {
      alert('Product Updated')
      // this.getAllProduct()
      this.productForm.reset()
      // this.mode="Add"

    }
    else {
      alert(res.message);
    }
  })
}
}

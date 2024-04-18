import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product/product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  isSidePanelVisible: boolean = false;
  categoryList: any[] = [];
  mode: string = "Add";//add or edit mode
  productList: any[] = [];

  productObj: any = {
    "productId": 0,
    "productSku": "",
    "productName": "",
    "productPrice": 0,
    "productShortName": "",
    "productDescription": "",
    "createdDate": new Date(),
    "deliveryTimeSpan": "",
    "categoryId": 0,
    "productImageUrl": "",
  }

  productForm = new FormGroup({
    sku: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    shortName: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    categoryId: new FormControl('', [Validators.required]),
    deliveryTimeSpan: new FormControl('', [Validators.required]),
    imageURL: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  constructor(private productSrv: ProductService) { }
  ngOnInit(): void {
    this.getAllCategory()
    this.getAllProduct()
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
    this.productSrv.saveProduct(createProduct).subscribe((res: any) => {
      if (res.result) {
        alert('Product Created')
        this.getAllProduct()
        this.productForm.reset()
        this.productForm.get('categoryId')?.reset()
        this.productForm.get('deliveryTimeSpan')?.reset()
      }
      else {
        alert(res.message);
      }
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
  onEdit(item: any) {
    this.productObj = item;
    this.isSidePanelVisible = true;
    this.productForm.get('sku')?.setValue(this.productObj.productSku)
    this.productForm.get('name')?.setValue(this.productObj.productName)
    this.productForm.get('shortName')?.setValue(this.productObj.productShortName)
    this.productForm.get('price')?.setValue(this.productObj.productPrice)
    this.productForm.get('categoryId')?.setValue(this.productObj.categoryId)
    this.productForm.get('deliveryTimeSpan')?.setValue(this.productObj.deliveryTimeSpan)
    this.productForm.get('imageURL')?.setValue(this.productObj.productImageUrl)
    this.productForm.get('description')?.setValue(this.productObj.productDescription)
    this.mode="Update";
  }
  updateProduct() {
    const updatedProduct = {
      productId: this.productObj.productId,
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
        this.getAllProduct()
        this.productForm.reset()

      }
      else {
        alert(res.message);
      }
    })
  }
  reset(){
    this.productForm.reset()
    this.mode="Add"
  }
}

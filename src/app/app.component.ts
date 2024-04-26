import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogPopUpComponent } from './pages/admin/products/dialog-pop-up/dialog-pop-up.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',

    styleUrl: './app.component.css',
    
})
export class AppComponent {
  title = 'e_commerce_site';
  receivedSearchProduct: any[]=[];

  receiveSearchProduct(searchProduct: any[]) {
    this.receivedSearchProduct = searchProduct;
  }
}

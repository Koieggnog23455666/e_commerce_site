import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProductService } from '../../../service/product/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
 category$:Observable<any>;
 constructor(private productsSry:ProductService){
  this.category$=this.productsSry.getCategory().pipe(
    map((item:any)=>{
      return item.data
    })
  );
 }
}

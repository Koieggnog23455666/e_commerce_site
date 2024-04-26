import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductService } from '../../../service/product/product.service';
import { productType } from '../../../interface';
import { Conditional } from '@angular/compiler';
import { Position } from 'popper.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  @ViewChild('searchInput') searchInput!: ElementRef;
  public lat: any;
  public lng: any;
  searchProduct:any
  searchPro:productType[]=[];
  searchText: string = '';
  location: any;

  constructor(private productService:ProductService,private host: ElementRef,private http:HttpClient){}
  ngOnInit(): void {
    this.host.nativeElement.ownerDocument.addEventListener('keydown', (event: { ctrlKey: any; metaKey: any; key: string; preventDefault: () => void; }) => {
      // Check if Ctrl (or Cmd on Mac) + F is pressed
      if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
        // Focus on the search input
        this.searchInput.nativeElement.focus();
        // Prevent the default find-in-page behavior
        event.preventDefault();
      }
    });
    this.getLocation()
  }
  getAllProduct() {
    this.productService.getProduct().subscribe((res:any)=>{
      this.searchText=res.data
    })
  }
  
  getProductByName(e:any) {
    this.searchProduct=e.target.value.toLowerCase()
       this.productService.getSearchProduct(this.searchProduct)
      }

  searchProducts() {
    this.productService.setSearchQuery(this.searchText);
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const apiEndpoint = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
          this.http.get<any>(apiEndpoint).subscribe(data => {
            const place = data.display_name;
            this.location = ` Location: ${place}`;
          });
        
      
          console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          console.log(this.lat);
          console.log(this.lng);
        }
      },
        (error) => console.log(error));
    } 
    else {
      alert("Geolocation is not supported by this browser.");
    }
  }
}

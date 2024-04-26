import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Constant} from '../constant/constant'
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { constants } from 'buffer';
import { METHODS } from 'http';
import { productType } from '../../interface';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  searchList:any
  
  private searchQuerySubject = new BehaviorSubject<string>('');
  public searchQuery$ = this.searchQuerySubject.asObservable();

  setSearchQuery(query: string): void {
    this.searchQuerySubject.next(query);
  }

  getSearchProduct(data: any){
    this.searchList=data
    console.log("search name",this.searchList)
   }
   setSearchProduct(){
    return this.searchList
   }
  constructor(private http:HttpClient) { }
  getCategory(){
    return this.http.get(Constant.API_END_POINT+Constant.METHODS.GET_ALL_CATEGORY)
  }
  getProduct(){
    return this.http.get(Constant.API_END_POINT+Constant.METHODS.GET_ALL_PRODUCT)
  }
  getProductByCategoryId(id:number){
    return this.http.get(Constant.API_END_POINT+Constant.METHODS.GET_ALL_PRODUCT_BY_CATEGORYID+id)
  }
  saveProduct(obj:any){
    return this.http.post(Constant.API_END_POINT+Constant.METHODS.CREATE_PRODUCT,obj)
  }
  updateProduct(obj:any){
    return this.http.post(Constant.API_END_POINT+Constant.METHODS.UPDATE_PRODUCT,obj)
  }
  deleteProduct(id:any){
    return this.http.get(Constant.API_END_POINT+Constant.METHODS.DELETE_PRODUCT+id)
  }
  getDataCartByCustId(custId:any){
    return this.http.get(Constant.API_END_POINT+Constant.METHODS.GET_DATA_CUSTID+custId)
  }
  
  addToCart(obj:any){
    return this.http.post(Constant.API_END_POINT+Constant.METHODS.ADD_TO_CART,obj)
  }
  

}

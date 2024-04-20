export interface product{
    productId: string,
    productSku: string,
    productName: string,
    productShortName: string,
    productPrice: string,
    productDescription:string ,
    createdDate: Date,
    deliveryTimeSpan:string ,
    categoryId: string,
    productImageUrl:string ,
    categoryName:string,
   
}
export interface category{
    categoryName:string,
    categoryId:number
}
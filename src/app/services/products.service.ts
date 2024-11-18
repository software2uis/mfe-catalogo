import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ResponsePaginated } from '../models/paginate.interface';
import { Product } from '../models/product.interface';
import { BehaviorSubject } from 'rxjs';
import { ProductFilterDTO } from '../models/product-filter.interface';

@Injectable({providedIn: 'root'})
export class ProductsService {

  http:HttpClient = inject(HttpClient);

  private products = new BehaviorSubject<Product[]>([]);

  set setProducts(product:Product[]){
    this.products.next(product);
  }

  get getProducts(){
    return this.products;
  }

  getAllProductsByQuery(query?:string) {

    const productFilterDTO = {query} as ProductFilterDTO;
    return this.http.post<ResponsePaginated>(environment.baseUrl  + '/public/api/products', productFilterDTO)
  }

  getProductById(id:string) {
    return this.http.get<Product>(environment.baseUrl  + '/public/api/products/' + id);

  }
}

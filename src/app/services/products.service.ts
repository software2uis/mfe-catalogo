import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ResponsePaginated } from '../models/paginate.interface';
import { Product } from '../models/product.interface';
import { BehaviorSubject } from 'rxjs';

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

    const params = query ? new HttpParams().set('query',query) : {};

    return this.http.get<ResponsePaginated>(environment.baseUrl  + '/public/api/products',{params})
  }

  getProductById(id:string) {
    return this.http.get<Product>(environment.baseUrl  + '/public/api/products/' + id);

  }
}

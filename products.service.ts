import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ResponsePaginated } from '../models/paginate.interface';
import { Product } from '../models/product.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  http: HttpClient = inject(HttpClient);

  private products = new BehaviorSubject<Product[]>([]);

  set setProducts(product: Product[]) {
    this.products.next(product);
  }

  get getProducts() {
    return this.products;
  }

  getAllProductsByQuery(query?: string, minPrice?: string, maxPrice?: string) {
    let params = new HttpParams();

    if (query) {
      params = params.set('query', query);
    }
    if (minPrice) {
      params = params.set('minPrice', minPrice);
    }
    if (maxPrice) {
      params = params.set('maxPrice', maxPrice);
    }

    console.log('Params:', params.toString());

    return this.http.get<ResponsePaginated>(
      `${environment.baseUrl}/public/api/products`,
      { params }
    );
  }

  getProductById(id: string) {
    return this.http.get<Product>(
      environment.baseUrl + '/public/api/products/' + id
    );
  }
}

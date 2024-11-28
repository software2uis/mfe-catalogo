import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ResponsePaginated } from '../models/paginate.interface';
import { Product } from '../models/product.interface';
import { BehaviorSubject } from 'rxjs';
import { ProductFilterDTO } from '../models/product-filter.interface';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient);
  private productsSubject = new BehaviorSubject<Product[]>([]);
  private totalPagesSubject = new BehaviorSubject<number>(0);
  private currentPageSubject = new BehaviorSubject<number>(0);

  set setProducts(products: Product[]) {
    this.productsSubject.next(products);
  }

  get getProducts() {
    return this.productsSubject.asObservable();
  }

  get getTotalPages() {
    return this.totalPagesSubject.asObservable();
  }

  set setCurrentPage(page: number) {
    this.currentPageSubject.next(page);
  }

  get getCurrentPage() {
    return this.currentPageSubject.asObservable();
  }

  getAllProductsByQuery(query: string = '', page: number = 0, size: number = 6) {
    this.setCurrentPage = page;
    const productFilterDTO: ProductFilterDTO = { query };
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.post<ResponsePaginated<Product>>(
      `${environment.baseUrl}/public/api/products`,
      productFilterDTO,
      { params }
    ).pipe(
      tap(response => {
        this.totalPagesSubject.next(response.totalPages);
        this.setProducts = response.content;
      })
    );
  }

  getProductById(id: string) {
    return this.http.get<Product>(`${environment.baseUrl}/public/api/products/${id}`);
  }
}

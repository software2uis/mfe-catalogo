import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../../environments/environment';
import { ResponsePaginated } from '../models/paginate.interface';
import { Product } from '../models/product.interface';
import { BehaviorSubject, Subject } from 'rxjs';
import { ProductFilterDTO } from '../models/product-filter.interface';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  apiUrl = `${environments.backCatalogo}/public/api/products`;
  private http = inject(HttpClient);
  private productsSubject = new BehaviorSubject<Product[]>([]);
  private productFilterDTO = new Subject<ProductFilterDTO>();
  private query = new Subject<string>()
  private totalPagesSubject = new BehaviorSubject<number>(0);
  private currentPageSubject = new BehaviorSubject<number>(0);

  set setProducts(products: Product[]) {
    this.productsSubject.next(products);
  }
  set setCurrentPage(page: number) {
    this.currentPageSubject.next(page);
  }

  set setProductFilterDTO(productFilter:ProductFilterDTO){
    this.productFilterDTO.next(productFilter);
  }

  set setQuery(query:string){
    this.query.next(query);
  }

  get getProducts() {
    return this.productsSubject.asObservable();
  }

  get getTotalPages() {
    return this.totalPagesSubject.asObservable();
  }

  get getQuery(){
    return this.query.asObservable();
  }


  get getCurrentPage() {
    return this.currentPageSubject.asObservable();
  }


  get getProductFilterDTO(){
    return this.productFilterDTO.asObservable();
  }

  getAllProductsByQuery(
    query: string = '',
    productFilterDTO?: ProductFilterDTO,
    page: number = 0,
    size: number = 6
  ) {
    this.setCurrentPage = page;
    const filter: ProductFilterDTO = { query, ...productFilterDTO };
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http
      .post<ResponsePaginated<Product>>(
        `${environments.backCatalogo}/public/api/products`,
        filter,
        { params }
      )
      .pipe(
        tap((response) => {
          this.totalPagesSubject.next(response.totalPages);
          this.setProducts = response.content;
        })
      );
  }

  getProductById(id: string) {
    return this.http.get<Product>(
      `${environments.backCatalogo}/public/api/products/${id}`
    );
  }
  getProductsByCategory(category: string) {
    const body = {
      categoryName: category,
    };

    return this.http
      .post<ResponsePaginated<Product>>(
        `${environments.backCatalogo}/public/api/products`,
        body
      )
      .pipe(
        tap((response) => {
          this.totalPagesSubject.next(response.totalPages);
          this.setProducts = response.content;
        })
      );
  }
  getProductsByRating(rating: number) {
    const body = {
      score: rating,
    };

    return this.http
      .post<ResponsePaginated<Product>>(
        `${environments.backCatalogo}/public/api/products`,
        body
      )
      .pipe(
        tap((response) => {
          this.totalPagesSubject.next(response.totalPages);
          this.setProducts = response.content;
        })
      );
  }

  // Método combinado para obtener productos por categoría y rating
  // Lo ideal sería al final combinar todos los filtros en un solo método del servicio !!!!!!

  getProductsByCategoryAndRating(category: string, rating: number) {
    const body = {
      categoryName: category,
      score: rating,
    };

    return this.http
      .post<ResponsePaginated<Product>>(
        `${environments.backCatalogo}/public/api/products`,
        body
      )
      .pipe(
        tap((response) => {
          this.totalPagesSubject.next(response.totalPages);
          this.setProducts = response.content;
        })
      );
  }

  getProductsByFilters(
    Category: string,
    rating: number,
    minPrice: number,
    maxPrice: number,
    query?: string
  ) {
    const body = {
      query,
      categoryName: Category,
      score: rating,
      minPrice: minPrice,
      maxPrice: maxPrice,
    };

    const params = new HttpParams()
    .set('page', 0)
    .set('size', 6);

    return this.http
      .post<ResponsePaginated<Product>>(
        `${environments.backCatalogo}/public/api/products`,
        body,
        {params}
      )
      .pipe(
        tap((response) => {
          this.totalPagesSubject.next(response.totalPages);
          this.setProducts = response.content;
        })
      );
  }
}

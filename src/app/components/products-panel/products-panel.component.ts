import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.interface';
import { Store } from '@ngrx/store';
import { ProductComponent } from '../product/product.component';
import { ProductFilterDTO } from '../../models/product-filter.interface';

@Component({
  selector: 'app-products-panel',
  standalone: true,
  imports: [CommonModule, ProductComponent],
  templateUrl: './products-panel.component.html',
  styleUrl: './products-panel.component.scss'
})
export class ProductsPanelComponent {

  products: Product[] = [];
  totalPages: number = 0;
  currentPage: number = 0;
  filters :ProductFilterDTO ={};
  query: string = '';

  productsService: ProductsService = inject(ProductsService);

  ngOnInit() {
    this.productsService.getProducts.subscribe((products) => {
      this.products = products;
    });
    this.productsService.getTotalPages.subscribe(totalPages => this.totalPages = totalPages);
    this.productsService.getCurrentPage.subscribe(currentPage => this.currentPage = currentPage);
    this.productsService.getProductFilterDTO.subscribe((filters)=> this.filters = filters);
    this.productsService.getQuery.subscribe((query)=> this.query = query);

    this.loadPage(this.currentPage);
  }

  loadPage(page: number) {
    this.currentPage = page;
    this.productsService.getAllProductsByQuery(this.query,this.filters,page).subscribe();
  }

  getMainImage(product: Product): string {
    return product.images.find((image) => image.isMain)?.url || '';
  }
}

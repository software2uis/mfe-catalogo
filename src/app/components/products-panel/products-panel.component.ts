import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.interface';
import { Store } from '@ngrx/store';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-products-panel',
  standalone: true,
  imports: [CommonModule, ProductComponent],
  templateUrl: './products-panel.component.html',
  styleUrl: './products-panel.component.scss'
})
export class ProductsPanelComponent {

  products: Product[] = [];

  productsService: ProductsService = inject(ProductsService);

  ngOnInit() {


    this.productsService.getAllProductsByQuery().subscribe((products) => {
      this.productsService.setProducts = products.content;
    });

    this.productsService.getProducts.subscribe((products) => {
      this.products = products;
    });
  }

  getMainImage(index: number): string {
    return this.products[index].images.find(image => image.isMain)?.url || ''

  }
}

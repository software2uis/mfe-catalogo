import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.interface';
import { Store } from '@ngrx/store';
import { changeProducts, selectProducts } from '../../store/products.actions';
import { ProductComponent } from '../product/product.component';
import { forkJoin } from 'rxjs';

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
  store: Store<Product> = inject(Store);

  ngOnInit() {


    this.productsService.getAllProductsByQuery().subscribe((products) => {
      this.products = products.content;
      this.store.dispatch(changeProducts({ products: products.content }))
      this.store.select(selectProducts).subscribe((products) => {this.products = products;});
    });
  }

}

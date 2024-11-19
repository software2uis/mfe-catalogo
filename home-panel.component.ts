// src/app/components/home-panel/home-panel.component.ts
import { Component, inject } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import { FilterPanelComponent } from '../filter-panel/filter-panel.component';
import { ProductsPanelComponent } from '../products-panel/products-panel.component';
import { ProductComponent } from '../product/product.component';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-home-panel',
  standalone: true,
  imports: [
    SplitterModule,
    FilterPanelComponent,
    ProductsPanelComponent,
    ProductComponent,
  ],
  templateUrl: './home-panel.component.html',
  styleUrls: ['./home-panel.component.scss'],
})
export class HomePanelComponent {
  productsService: ProductsService = inject(ProductsService);

  onFiltersChanged(filters: {
    query: string;
    minPrice?: string;
    maxPrice?: string;
  }) {
    const { query, minPrice, maxPrice } = filters;

    this.productsService
      .getAllProductsByQuery(query, minPrice, maxPrice)
      .subscribe((response) => {
        this.productsService.setProducts = response.content;
        console.log('Products:', this.productsService.getProducts);
      });
  }
}

import { Category } from './../../models/product.interface';
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products.service'; // Importa el servicio para acceder a los productos
import { ProductFilterDTO } from '../../models/product-filter.interface';
import { InputTextModule } from 'primeng/inputtext';



@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [CommonModule, InputTextModule, FormsModule],
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss'],
})
export class FilterPanelComponent {
  filters: ProductFilterDTO = {
    category: '',
    minPrice: 0,
    maxPrice: 0,
    rating: 0, // 0-5
    query: '',
  };

  query: string = '';


  @Output() filtersChanged = new EventEmitter<ProductFilterDTO>();

  constructor(private productsService: ProductsService) {}

  ngOnInit(){
    this.productsService.getQuery.subscribe((query)=> this.query = query);

  }


  // Método para aplicar los filtros combinados
  applyFilters() {
    // Crear un objeto de filtros combinado
    const combinedFilters: any = {};

    if (this.filters.category) {
      combinedFilters.categoryName = this.filters.category;
    }

    if (!!this.filters.rating) {
      combinedFilters.score = this.filters.rating;
    }

    if (!!this.filters.minPrice) {
      combinedFilters.minPrice = this.filters.minPrice;
    }

    if (!!this.filters.maxPrice) {
      combinedFilters.maxPrice = this.filters.maxPrice;
    }

    // Llamar al servicio para obtener los productos filtrados por categoría y rating
    // Lo ideal sería al final combinar todos los filtros en un solo método del servicio !!!!!!
    if (
      combinedFilters.categoryName ||
      combinedFilters.score ||
      combinedFilters.minPrice ||
      combinedFilters.maxPrice
    ) {
      // this.productsService
      //   .getProductsByCategoryAndRating(
      //     combinedFilters.categoryName,
      //     combinedFilters.score
      //   )
      //   .subscribe({
      //     next: (response) => {
      //       console.log('Productos filtrados:', response);
      //     },
      //     error: (error) => {
      //       console.error('Error al obtener productos:', error);
      //     },
      //   });
      this.productsService
        .getProductsByFilters(
          combinedFilters.categoryName,
          combinedFilters.score,
          combinedFilters.minPrice,
          combinedFilters.maxPrice,
          this.query
        )
        .subscribe({
          next: (response) => {
            console.log('Productos filtrados:', response);
            this.productsService.setProductFilterDTO = combinedFilters;
            this.productsService.setCurrentPage = 0;
          },
          error: (error) => {
            console.error('Error al obtener productos:', error);
          },
        });
    }
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products.service'; // Importa el servicio para acceder a los productos

interface Filters {
  category: string;
  minPrice: number;
  maxPrice: number;
  rating: number;
  query?: string;
}

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss'],
})
export class FilterPanelComponent {
  filters: Filters = {
    category: '',
    minPrice: 0,
    maxPrice: 0,
    rating: 0, // 0-5
    query: '',
  };

  @Output() filtersChanged = new EventEmitter<Filters>();

  constructor(private productsService: ProductsService) {}

  // Método para aplicar los filtros combinados
  applyFilters() {
    // Crear un objeto de filtros combinado
    const combinedFilters: any = {};

    if (this.filters.category) {
      combinedFilters.categoryName = this.filters.category;
    }

    if (this.filters.rating > 0) {
      combinedFilters.score = this.filters.rating;
    }

    if (this.filters.minPrice > 0) {
      combinedFilters.minPrice = this.filters.minPrice;
    }

    if (this.filters.maxPrice > 0) {
      combinedFilters.maxPrice = this.filters.maxPrice;
    }


    // Llamar al servicio para obtener los productos filtrados por categoría y rating
    // Lo ideal sería al final combinar todos los filtros en un solo método del servicio !!!!!!
    if (combinedFilters.categoryName || combinedFilters.score) {
      this.productsService.getProductsByCategoryAndRating(
        combinedFilters.categoryName,
        combinedFilters.score
      ).subscribe({
        next: (response) => {
          console.log('Productos filtrados:', response);
        },
        error: (error) => {
          console.error('Error al obtener productos:', error);
        },
      });
    }
  }
}

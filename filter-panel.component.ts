// src/app/components/filter-panel/filter-panel.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-panel.component.html',
})
export class FilterPanelComponent {
  filters = {
    category: '', // Filtro por categoría
    minPrice: null, // Filtro por precio mínimo
    maxPrice: null, // Filtro por precio máximo
    rating: null, // Filtro por calificación de 1 a 5
  };

  @Output() filtersChanged = new EventEmitter<string>();

  applyFilters() {
    const queryParams = [];

    // Añadir filtro de categoría si existe
    if (this.filters.category) {
      queryParams.push(`category=${this.filters.category}`);
    }

    // Añadir filtro de precio mínimo si existe
    if (this.filters.minPrice !== null) {
      queryParams.push(`price[gte]=${this.filters.minPrice}`); // >= minPrice
    }

    // Añadir filtro de precio máximo si existe
    if (this.filters.maxPrice !== null) {
      queryParams.push(`price[lte]=${this.filters.maxPrice}`); // <= maxPrice
    }

    // Añadir filtro de calificación si existe
    if (this.filters.rating !== null) {
      queryParams.push(`rating=${this.filters.rating}`);
    }

    const query = queryParams.join('&');
    this.filtersChanged.emit(query);
  }
}

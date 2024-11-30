import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products.service'; // Importa el servicio para acceder a los productos

interface Filters {
  category: string;
  minPrice: number;
  maxPrice: number;
  rating: number;
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
    category: '', // El valor predeterminado es vacío
    minPrice: 0,
    maxPrice: 0,
    rating: 0,
  };

  @Output() filtersChanged = new EventEmitter<{
    query: string; // Este es el filtro que se emite al componente padre
  }>();

  constructor(private productsService: ProductsService) {}

  // Método para aplicar filtros
  applyFilters() {
    // Si se ha seleccionado una categoría
    if (this.filters.category) {
      // Emitir el filtro de categoría
      this.filtersChanged.emit({ query: this.filters.category });

      // Llamar al servicio para obtener los productos filtrados por la categoría
      this.productsService.getProductsByCategory(this.filters.category).subscribe({
        next: (response) => {
          console.log('Productos filtrados por categoría:', response);
          // Aquí puedes manejar el resultado de los productos si lo necesitas
        },
        error: (error) => {
          console.error('Error al obtener productos:', error);
        },
      });
    }
  }
}

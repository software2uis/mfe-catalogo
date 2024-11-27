// src/app/components/filter-panel/filter-panel.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Filters {
  category: string;
  minPrice: number | null;
  maxPrice: number | null;
  rating: number | null;
}

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-panel.component.html',
  styleUrl: './filter-panel.component.scss',
})
export class FilterPanelComponent {
  filters: Filters = {
    category: '',
    minPrice: null,
    maxPrice: null,
    rating: null,
  };

  @Output() filtersChanged = new EventEmitter<{
    query: string;
    minPrice?: string;
    maxPrice?: string;
  }>();

  applyFilters() {
    const queryParams = [];

    if (this.filters.category) {
      queryParams.push(`category=${this.filters.category}`);
    }

    if (this.filters.rating !== null) {
      queryParams.push(`rating=${this.filters.rating}`);
    }

    const query = queryParams.join('&');

    // Emitir filtros con `null` convertido a `undefined`
    this.filtersChanged.emit({
      query,
      minPrice:
        this.filters.minPrice !== null
          ? this.filters.minPrice.toString()
          : undefined,
      maxPrice:
        this.filters.maxPrice !== null
          ? this.filters.maxPrice.toString()
          : undefined,
    });
  }
}

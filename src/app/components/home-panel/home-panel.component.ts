import { Component, inject } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import { FilterPanelComponent } from '../filter-panel/filter-panel.component';
import { ProductsPanelComponent } from '../products-panel/products-panel.component';
import { ProductComponent } from '../product/product.component';
import { catchError, of, tap } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { ResponsePaginated } from '../../models/paginate.interface';

@Component({
  selector: 'app-home-panel',
  standalone: true,
  imports: [SplitterModule, FilterPanelComponent, ProductsPanelComponent],
  templateUrl: './home-panel.component.html',
  styleUrl: './home-panel.component.scss'
})
export class HomePanelComponent {
  updateDataHandlerSuggestion:any;
  updateDataHandlerQuery:any;

  productsService:ProductsService = inject(ProductsService);

  constructor() {
}

  ngOnInit() {


    this.updateDataHandlerQuery = (event: CustomEvent) => {
      this.productsService.getAllProductsByQuery(event.detail.query)
      .pipe(
        tap(
          (products:ResponsePaginated  )=>{

          this.productsService.setProducts = products.content;


          }
        )
      ).subscribe();
    };
    window.addEventListener('productsQuery', this.updateDataHandlerQuery);


  }




  ngOnDestroy() {
    window.removeEventListener('productsQuery', this.updateDataHandlerQuery);

  }

}

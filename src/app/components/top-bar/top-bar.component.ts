import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { ProductsService } from '../../services/products.service';
import { Store } from '@ngrx/store';
import { Product } from '../../models/product.interface';
import { changeProducts } from '../../store/products.actions';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [ButtonModule, ToolbarModule, InputTextModule, IconFieldModule, InputIconModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {

  productsService:ProductsService = inject(ProductsService);
  store:Store<Product> = inject(Store);

  searchProductsWithQuery(text:string){
    this.productsService.getAllProductsByQuery(text).subscribe((products)=>{
      this.store.dispatch(changeProducts({products:products.content}));
    });
  }

}

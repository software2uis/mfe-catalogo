import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [ButtonModule, ToolbarModule, InputTextModule, IconFieldModule, InputIconModule, ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {



  @Output()
  public OnValue:EventEmitter<Product[]> = new EventEmitter();

  productsService:ProductsService = inject(ProductsService);
  router:Router = inject(Router);



  searchProductsWithQuery(text:string){
    this.productsService.getAllProductsByQuery(text).subscribe((products)=>{
      this.productsService.setProducts = products.content;


    });
  }

  goToHome(){
    this.router.navigate(['/home']);

  }
  
  goToLogin(){
    this.router.navigate(['/login']);

  }
}

import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product, ProductImages } from '../../models/product.interface';
import { forkJoin, map, switchMap, tap } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { CommonModule, KeyValue } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ButtonModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  selectedImage: string = ''; // Imagen inicial
  quantity: number = 1;  // Cantidad inicial

  route:ActivatedRoute = inject(ActivatedRoute);
  productsService:ProductsService = inject(ProductsService);

  idProducto:string = '';
  product!:Product;

  ProductoImages = ProductImages;


  // Cambiar imagen principal cuando se selecciona una miniatura
  changeImage(newImage: string) {
    this.selectedImage = newImage;
  }

  // Incrementar y disminuir cantidad
  plusQuantity() {
    this.quantity = this.quantity + 1;
  }
  minusQuantity() {
    if (this.quantity > 1) {
      this.quantity = this.quantity - 1;
    }
  }
  private onCompare(_left: KeyValue<any, any>, _right: KeyValue<any, any>): number {
    return -1;
  }

  // Selección de talla
  selectedSize: string = 'L';  // Talla por defecto

  selectSize(size: string) {
    this.selectedSize = size;
  }

  ngOnInit(){


    forkJoin([
      this.route.params.pipe(
        map(params => params['id']),
        tap(id=> this.idProducto =  id),
        switchMap(id => this.productsService.getProductById(id)),
        tap(product => this.product = product)
      ),
      this.route.queryParamMap.pipe(
        map(params => Number(params.get('idImage'))),
        tap(id => { if(!id) return; this.selectedImage = ProductImages[id]; console.log(this.selectedImage);})

      )

    ]).subscribe();






}
}


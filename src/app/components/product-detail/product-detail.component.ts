import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductImages } from '../../models/product.interface';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { map, switchMap, tap } from 'rxjs';


@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ButtonModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {

  selectedImage: string = ''; // Imagen inicial
  quantity: number = 1;  // Cantidad inicial
  selectedColor: string = ''; // Color seleccionado
  selectedSpecs: { [key: string]: string } = {}; // Almacena todas las especificaciones seleccionadas


  // Inyectar los servicios
  route: ActivatedRoute = inject(ActivatedRoute);
  productsService: ProductsService = inject(ProductsService);

  product!: Product;
  isLoadingImage: boolean = false;
  ProductoImages = ProductImages;
  idProducto: string = '';



  // Cambiar imagen principal cuando se selecciona una miniatura
  changeImage(newImage: string) {
    if (newImage && !this.isLoadingImage) {
      this.selectedImage = newImage;
    }
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
  // private onCompare(_left: KeyValue<any, any>, _right: KeyValue<any, any>): number {
  //   return -1;
  // }

  hasColorSpecification(): boolean {
    return this.product.specifications.some(spec => spec?.name === 'Color');
  }

  // Método para seleccionar el color y actualizar la imagen
  selectColor(color: string) {
    if (!this.hasColorSpecification()) return;

    this.selectedColor = color;
    this.selectedSpecs['Color'] = color;
    this.isLoadingImage = true;

    const newImage = this.product.images.find(img => img.color === color);
    if (newImage) {
      this.selectedImage = newImage.url;
    }
    this.isLoadingImage = false;
  }

//   ngOnInit() {
//     forkJoin([
//       this.route.params.pipe(
//         map(params => params['id']),
//         tap(id => this.idProducto = id),
//         switchMap(id => this.productsService.getProductById(id)),
//         tap(product => this.product = product)
//       ),
//       this.route.queryParamMap.pipe(
//         map(params => Number(params.get('idImage'))),
//         tap(id => { if (!id) return; this.selectedImage = ProductImages[id]; console.log(this.selectedImage); })
//       )
//     ]).subscribe();
//   }
// }


  ngOnInit() {
    // Use one of the example products for testing
      this.route.params.pipe(
        map(params => params['id']),
        tap(id => this.idProducto = id),
        switchMap(id => this.productsService.getProductById(id)),
        tap(product => {
          this.product = product
          // Inicializar con la imagen principal
          const mainImage = this.product.images.find(img => img.isMain) || this.product.images[0];
          this.selectedImage = mainImage.url;
          if (this.hasColorSpecification()) {
            this.selectedColor = mainImage.color || '';
          }

          // Initialize selected specifications with default values
          // Solo establecer selectedColor si el producto tiene especificación de color
          this.product.specifications.forEach(spec => {
            this.selectedSpecs[spec.name] = spec.values[0];
          });

        })
      ).subscribe()


  }
}

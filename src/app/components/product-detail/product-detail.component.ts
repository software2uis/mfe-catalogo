import { Component } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  selectedImage: string = 'assets/images/tshirt-front.jpg'; // Imagen inicial
  quantity: number = 1;  // Cantidad inicial

  // Cambiar imagen principal cuando se selecciona una miniatura
  changeImage(newImage: string) {
    this.selectedImage = newImage;
  }

  // Incrementar y disminuir cantidad
  adjustQuantity(change: number) {
    if (this.quantity + change > 0) {
      this.quantity += change;
    }
  }

  // Selección de talla
  selectedSize: string = 'L';  // Talla por defecto

  selectSize(size: string) {
    this.selectedSize = size;
  }

}


import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ProductImages } from '../../models/product.interface';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'] // Corrección en la propiedad `styleUrls`
})
export class ProductComponent {

  router = inject(Router);
  route = inject(ActivatedRoute);

  @Input() id: number = 0;
  @Input() idMongo: string = '';
  @Input() name: string = '';
  @Input() price: number = 0;
  @Input() imageUrl: string = '';
  @Input() rating: number = 0;

  ProductImages = ProductImages;

  // Navegar a la página de detalles del producto
  goToDetail() {
    this.router.navigate(['/product-detail/', this.idMongo]);
  }

  // Método para agregar un producto al carrito
  addToCart() {
    // Crear el objeto del producto a agregar
    const productToAdd = {
      idMongo: this.idMongo,
      name: this.name,
      price: this.price,
      imageUrl: this.imageUrl,
      quantity: 1 // Cantidad inicial al agregar
    };

    // Obtener el carrito actual desde localStorage
    const cart = JSON.parse(localStorage.getItem('cartItems') || '[]');

    // Buscar si el producto ya existe en el carrito
    const existingProductIndex = cart.findIndex((item: any) => item.idMongo === productToAdd.idMongo);

    if (existingProductIndex !== -1) {
      // Si ya existe, incrementar la cantidad
      cart[existingProductIndex].quantity += 1;
    } else {
      // Si no existe, agregar el producto al carrito
      cart.push(productToAdd);
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('cartItems', JSON.stringify(cart));

    // Mostrar mensaje de confirmación
    alert('El producto se añadió exitosamente al carrito');
  }
}

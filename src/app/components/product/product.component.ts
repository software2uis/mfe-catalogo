import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ProductImages } from '../../models/product.interface';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { ProductCarrito } from '../../models/product-carrito.interface';
import { tap } from 'rxjs';

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
  carritoService = inject(CarritoService);
  cart: ProductCarrito[]  = [];

  @Input() id: number = 0;
  @Input() idMongo: string = '';
  @Input() name: string = '';
  @Input() price: number = 0;
  @Input() imageUrl: string = '';
  @Input() rating: number = 0;

  user: string  | null = null;

  ngOnInit(): void {
    // Cargar productos desde localStorage al iniciar el componente
    this.user = localStorage.getItem('username');

    if(this.user){
      this.carritoService.getCartContents(this.user)
      .pipe(
        tap((response) => {

          this.cart = response.filter((item: ProductCarrito) => item.idMongo !== null && this.idMongo === item.idMongo);
        })
      ).subscribe();
  }
}
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
    if(!this.user){

      this.cart = JSON.parse(localStorage.getItem('cartItems') || '[]') ;
    }


    // Buscar si el producto ya existe en el carrito
    const existingProductIndex = this.cart.findIndex((item: any) => item.idMongo === productToAdd.idMongo);

    if (existingProductIndex !== -1) {
      // Si ya existe, incrementar la cantidad
      this.cart[existingProductIndex].quantity += 1;
    } else {
      // Si no existe, agregar el producto al carrito
      this.cart.push(productToAdd);
    }

    if(this.user){
      this.carritoService.addProductsToCart(this.cart, this.user).subscribe();
    }else{
      // Guardar el carrito actualizado en localStorage

      localStorage.setItem('cartItems', JSON.stringify(this.cart));
    }


    // Mostrar mensaje de confirmación
    alert('El producto se añadió exitosamente al carrito');
  }
}

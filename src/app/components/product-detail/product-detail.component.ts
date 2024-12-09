import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductImages } from '../../models/product.interface';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { filter, map, switchMap, tap } from 'rxjs';
import { CarritoService } from '../../services/carrito.service';
import { ProductCarrito } from '../../models/product-carrito.interface';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ButtonModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  selectedImage: string = ''; // Imagen inicial
  quantity: number = 1;  // Cantidad inicial
  selectedColor: string = ''; // Color seleccionado
  selectedSpecs: { [key: string]: string } = {}; // Almacena todas las especificaciones seleccionadas
  successMessage: string = ''; // Mensaje de éxito para agregar al carrito
  user: string  | null = null;
  route: ActivatedRoute = inject(ActivatedRoute);
  productsService: ProductsService = inject(ProductsService);
  carritoService = inject(CarritoService);
  cart: ProductCarrito[]  = [];
  router: Router = inject(Router); // Asegúrate de que esté bien inyectado


  product!: Product;
  isLoadingImage: boolean = false;
  ProductoImages = ProductImages;
  idProducto: string = '';

  // Cambiar la imagen principal cuando se selecciona una miniatura
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

  // Verificar si el producto tiene especificación de color
  hasColorSpecification(): boolean {
    return this.product.specifications.some(spec => spec?.name === 'Color');
  }

  // Seleccionar el color y actualizar la imagen principal
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

  // Método para agregar el producto al carrito
  addToCart() {
    // Crear el objeto del producto a agregar
    const productToAdd = {
      idMongo: this.product.id, // Identificador único del producto
      name: this.product.name,
      price: this.product.price,
      quantity: this.quantity > 0 ? this.quantity : 1, // Garantizar que la cantidad sea válida
      color: this.selectedColor,
      imageUrl: this.selectedImage // Usar `imageUrl` para consistencia
    };

    // Obtener el carrito actual desde localStorage
    if(!this.user){

      this.cart = JSON.parse(localStorage.getItem('cartItems') || '[]') ;
    }


    // Buscar si el producto ya existe en el carrito
    const existingProductIndex = this.cart.findIndex((item: any) => item.idMongo === productToAdd.idMongo);

    if (existingProductIndex !== -1) {
      // Si ya existe, incrementar la cantidad
      this.cart[existingProductIndex].quantity += this.quantity;
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


    // Mostrar mensaje de éxito
    this.successMessage = 'El producto se añadió exitosamente al carrito';

    // Ocultar el mensaje después de unos segundos
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

  ngOnInit() {
    // Obtener los detalles del producto basado en el ID de la ruta

    this.user = localStorage.getItem('username');

    if(this.user){
      this.carritoService.getCartContents(this.user)
      .pipe(
        tap((response) => {

          this.cart = response.filter((item: ProductCarrito) => item.idMongo !== null && this.idProducto === item.idMongo);
        })
      ).subscribe();

    }


    this.route.params.pipe(
      map(params => params['id']),
      tap(id => this.idProducto = id),
      switchMap(id => this.productsService.getProductById(id)),
      tap(product => {
        this.product = product;

        // Establecer la imagen principal y el color seleccionado
        const mainImage = this.product.images.find(img => img.isMain) || this.product.images[0];
        this.selectedImage = mainImage.url;
        if (this.hasColorSpecification()) {
          this.selectedColor = mainImage.color || '';
        }

        // Inicializar las especificaciones seleccionadas con valores predeterminados
        this.product.specifications.forEach(spec => {
          this.selectedSpecs[spec.name] = spec.values[0];
        });
      })
    ).subscribe();
  }
}

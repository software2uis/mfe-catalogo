import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductImages } from '../../models/product.interface';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';


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

  // Example of a shirt
  shirt: Product = {
    id: "1",
    category: "Shirts",
    name: "Cotton Shirt",
    description: "Comfortable and modern shirt.",
    price: 50,
    images: [
      { color: "#1b1b1c", url: "https://m.media-amazon.com/images/I/61r8tjbG74L._AC_SX569_.jpg", isMain: true },
      { color: "#9d051e", url: "https://m.media-amazon.com/images/I/716lh9ztPVL._AC_SX569_.jpg" },
      { color: "#064195", url: "https://m.media-amazon.com/images/I/61dQ6Bai-hL._AC_SX569_.jpg" }
    ],
    specifications: [
      {
        name: "Color",
        values: ["#1b1b1c", "#9d051e", "#064195"]
      },
      {
        name: "Size",
        values: ["S", "M", "L", "XL"]
      }
    ]
  };
  
  // Example of a telephone product
  telephone: Product = {
    id: "2",
    category: "Electronics",
    name: "Smartphone XYZ",
    description: "Latest model with advanced features.",
    price: 999,
    images: [
      { color: "#f9edd0", url: "https://m.media-amazon.com/images/I/71v9J20YfHL._AC_SX679_.jpg", isMain: true },
      { color: "#68577c", url: "https://m.media-amazon.com/images/I/716UvwH-NvL._AC_SX679_.jpg" },
      { color: "#c6c3c4", url: "https://m.media-amazon.com/images/I/71n6yF1SA4L._AC_SX679_.jpg" }
    ],
    specifications: [
      {
        name: "Color",
        values: ["#f9edd0", "#68577c", "#c6c3c4"]
      },
      {
        name: "Storage",
        values: ["64GB", "128GB", "256GB"]
      }
    ]
  };

  // Example of an alcoholic beverage (whiskey)
  whiskey: Product = {
    id: "3",
    category: "Beverages",
    name: "Premium Whiskey",
    description: "Aged 12 years with a smooth finish.",
    price: 120,
    images: [
      { 
        url: "https://bevgo.com.co/wp-content/uploads/2020/12/321.jpg",
        isMain: true 
      }
      // Podrías tener más imágenes del producto desde diferentes ángulos
      // { url: "https://bevgo.com.co/wp-content/uploads/2020/12/321-side.jpg" },
      // { url: "https://bevgo.com.co/wp-content/uploads/2020/12/321-back.jpg" }
    ],
    specifications: [
      {
        name: "Volume",
        values: ["750ml", "1L"]
      },
      {
        name: "Alcohol Content",
        values: ["40%", "45%"]
      }
    ]
  };

  // Example of a bathing cap
  bathingCap: Product = {
    id: "4",
    category: "Accessories",
    name: "Silicone Bathing Cap",
    description: "Durable and comfortable bathing cap.",
    price: 15,
    images: [
      { color: "#e9c6c7", url: "https://m.media-amazon.com/images/I/81+k4vFmSiL._SX466_.jpg", isMain: true },
      { color: "#90d0c9", url: "https://m.media-amazon.com/images/I/81CQ9p+kP2L._SX466_.jpg" },
      { color: "#d7c2a7", url: "https://m.media-amazon.com/images/I/71-KTLfglbL._SX466_.jpg" }
    ],
    specifications: [
      {
        name: "Color",
        values: ["#e9c6c7", "#90d0c9", "#d7c2a7"]
      },
      {
        name: "Size",
        values: ["Small", "Medium", "Large"]
      }
    ]
  };

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
    return this.product.specifications.some(spec => spec.name === 'Color');
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
    this.product = this.bathingCap; // Change this to test different products like this.telephone, this.whiskey, this.bathingCap

    // Inicializar con la imagen principal
    const mainImage = this.product.images.find(img => img.isMain) || this.product.images[0];

    // Solo establecer selectedColor si el producto tiene especificación de color
    this.selectedImage = mainImage.url;
    if (this.hasColorSpecification()) {
      this.selectedColor = mainImage.color || '';
    }

    // Initialize selected specifications with default values
    this.product.specifications.forEach(spec => {
      this.selectedSpecs[spec.name] = spec.values[0];
    });
  }
}

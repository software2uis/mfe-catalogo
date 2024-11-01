import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { Store } from '@ngrx/store';
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
  selectedColor: string = ''; // Color seleccionado
  selectedSpecs: { [key: string]: string } = {}; // Almacena todas las especificaciones seleccionadas

  route: ActivatedRoute = inject(ActivatedRoute);
  productsService: ProductsService = inject(ProductsService);

  idProducto: string = '';
  product!: Product;

  ProductoImages = ProductImages;

  // // Example of a shirt
  // shirt: Product = {
  //   id: "1",
  //   category: "Shirts",
  //   name: "Cotton Shirt",
  //   description: "Comfortable and modern shirt.",
  //   price: 50,
  //   image: "https://mensworld.com.bd/wp-content/uploads/2023/10/CSF-3317.jpg",
  //   specifications: [
  //     {
  //       name: "Color",
  //       values: ["#4F4631", "#314F4A", "#31344F"]
  //     },
  //     {
  //       name: "Size",
  //       values: ["S", "M", "L", "XL"]
  //     }
  //   ]
  // };
  
  // // Example of a telephone product
  // telephone: Product = {
  //   id: "2",
  //   category: "Electronics",
  //   name: "Smartphone XYZ",
  //   description: "Latest model with advanced features.",
  //   price: 999,
  //   image: "https://importmobilsas.com/cdn/shop/products/s21.jpg?v=1685489202",
  //   specifications: [
  //     {
  //       name: "Color",
  //       values: ["#000000", "#FFFFFF", "#FF5733"]
  //     },
  //     {
  //       name: "Storage",
  //       values: ["64GB", "128GB", "256GB"]
  //     }
  //   ]
  // };

  // // Example of an alcoholic beverage (whiskey)
  // whiskey: Product = {
  //   id: "3",
  //   category: "Beverages",
  //   name: "Premium Whiskey",
  //   description: "Aged 12 years with a smooth finish.",
  //   price: 120,
  //   image: "https://bevgo.com.co/wp-content/uploads/2020/12/321.jpg",
  //   specifications: [
  //     {
  //       name: "Volume",
  //       values: ["750ml", "1L"]
  //     },
  //     {
  //       name: "Alcohol Content",
  //       values: ["40%", "45%"]
  //     }
  //   ]
  // };

  // // Example of a bathing cap
  // bathingCap: Product = {
  //   id: "4",
  //   category: "Accessories",
  //   name: "Silicone Bathing Cap",
  //   description: "Durable and comfortable bathing cap.",
  //   price: 15,
  //   image: "https://shop.ninacampbell.com/cdn/shop/products/115582_Bathhatblueheart.jpg?v=1636211351",
  //   specifications: [
  //     {
  //       name: "Color",
  //       values: ["#FF0000", "#00FF00", "#0000FF"]
  //     },
  //     {
  //       name: "Size",
  //       values: ["Small", "Medium", "Large"]
  //     }
  //   ]
  // };

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


  ngOnInit() {
    forkJoin([
      this.route.params.pipe(
        map(params => params['id']),
        tap(id => this.idProducto = id),
        switchMap(id => this.productsService.getProductById(id)),
        tap(product => this.product = product)
      ),
      this.route.queryParamMap.pipe(
        map(params => Number(params.get('idImage'))),
        tap(id => { if (!id) return; this.selectedImage = ProductImages[id]; console.log(this.selectedImage); })
      )
    ]).subscribe();
  }
}


//   ngOnInit() {
//     // Use one of the example products for testing
//     this.product = this.bathingCap; // Change this to test different products like this.telephone, this.whiskey, this.bathingCap
//     this.selectedImage = this.product.image;

//     // Initialize selected specifications with default values
//     this.product.specifications.forEach(spec => {
//       this.selectedSpecs[spec.name] = spec.values[0];
//     });
//   }
// }

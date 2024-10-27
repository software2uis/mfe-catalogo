import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ProductImages } from '../../models/product.interface';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,ButtonModule, RouterModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {


  router = inject(Router);

  @Input() id:number = 0;
  @Input() idMongo:string = '';
  @Input() name:string = '';
  @Input() price:number = 0;

  rating:number = 2.5;

  ProductImages = ProductImages;


  goToDetail(){
    if(!environment.production){

      this.router.navigate(['/catalogo-app/product-detail',this.idMongo], {queryParams:{idImage:this.id}});
    }
  }

}

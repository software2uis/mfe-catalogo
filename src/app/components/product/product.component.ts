import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ProductImages } from '../../models/product.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,ButtonModule, RouterModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  @Input() id:number = 0;
  @Input() idMongo:string = '';
  @Input() name:string = '';
  @Input() price:number = 0;

  rating:number = 2.5;

  ProductImages = ProductImages;


}

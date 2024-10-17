import { Component } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import { FilterPanelComponent } from '../filter-panel/filter-panel.component';
import { ProductsPanelComponent } from '../products-panel/products-panel.component';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-home-panel',
  standalone: true,
  imports: [SplitterModule, FilterPanelComponent, ProductsPanelComponent,ProductComponent],
  templateUrl: './home-panel.component.html',
  styleUrl: './home-panel.component.scss'
})
export class HomePanelComponent {

}

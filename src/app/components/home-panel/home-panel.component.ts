import { Component } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import { FilterPanelComponent } from '../filter-panel/filter-panel.component';
import { ProductsPanelComponent } from '../products-panel/products-panel.component';

@Component({
  selector: 'app-home-panel',
  standalone: true,
  imports: [SplitterModule, FilterPanelComponent, ProductsPanelComponent],
  templateUrl: './home-panel.component.html',
  styleUrl: './home-panel.component.scss'
})
export class HomePanelComponent {

}

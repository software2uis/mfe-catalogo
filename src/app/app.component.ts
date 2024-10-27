import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { Store } from '@ngrx/store';
import { HomePanelComponent } from "./components/home-panel/home-panel.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopBarComponent, HomePanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'catalogo-app-new';

  constructor() {
}

  ngOnInit() {
  }

}




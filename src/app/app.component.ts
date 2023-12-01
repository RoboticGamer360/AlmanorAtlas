import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MastheadComponent } from './components/partials/masthead/masthead.component';
import { DrawerComponent } from './components/partials/drawer/drawer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MastheadComponent,
    DrawerComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
}) export class AppComponent {}

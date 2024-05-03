import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MastheadComponent } from './components/partials/masthead/masthead.component';
import { DrawerComponent } from './components/partials/drawer/drawer.component';
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MastheadComponent,
    DrawerComponent,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
}) export class AppComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthService
  ) {};

  async ngOnInit(): Promise<void> {
    this.document.addEventListener('keydown', (e) => {
      if (!e.altKey) return;
      switch (e.key) {
        case 'j':
          e.preventDefault();
          const jwt = prompt(`Manually enter a JWT:`);
          if (!jwt) break;
          localStorage.setItem('access_token', jwt);
          window.location.reload();
          break;

        case 'k':
          e.preventDefault();
          const confirmed = confirm(`Clear JWT and reload?`);
          if (!confirmed) break;
          localStorage.clear();
          window.location.reload();
          break;
      }
    });

    await this.authService.verifyToken();
  }
}

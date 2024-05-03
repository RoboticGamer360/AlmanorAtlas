import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatRippleModule } from '@angular/material/core';
import { RouterModule } from "@angular/router";
import { Subscription } from "rxjs";
import { User } from "src/app/core/auth/auth";
import { AuthService } from "src/app/core/auth/auth.service";
import { DrawerService } from "src/app/core/drawer/drawer.service";

@Component({
  selector: 'app-masthead',
  standalone: true,
  imports: [
    CommonModule,
    MatRippleModule,
    RouterModule
  ],
  templateUrl: './masthead.component.html',
  styleUrls: [ './masthead.component.scss' ]
}) export class MastheadComponent implements OnInit, OnDestroy {
  toggleDrawer = this.drawerService.toggle;
  user: User | null = this.authService.user;
  userChangedSubscription!: Subscription;

  constructor (
    private drawerService: DrawerService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userChangedSubscription = this.authService.onUserChanged.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.userChangedSubscription.unsubscribe();
  }
}

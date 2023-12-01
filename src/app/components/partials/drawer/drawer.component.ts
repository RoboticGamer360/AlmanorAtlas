import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatRippleModule } from '@angular/material/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Subscription } from "rxjs";
import { DrawerService } from "src/app/core/drawer/drawer.service";

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatRippleModule
  ],
  templateUrl: './drawer.component.html',
  styleUrls: [ './drawer.component.scss' ]
}) export class DrawerComponent implements OnInit, OnDestroy {
  isOpen = this.drawerService.isOpen;
  drawerServiceSubscription!: Subscription;
  drawerEntries = this.drawerService.entries;
  closeDrawer = this.drawerService.close;
  
  constructor (
    private drawerService: DrawerService
  ) {}

  ngOnInit(): void {
    this.drawerServiceSubscription = this.drawerService.onDrawerStateChanged.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
  }

  ngOnDestroy(): void {
    this.drawerServiceSubscription.unsubscribe();
  }
}

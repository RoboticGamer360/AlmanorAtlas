import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatRippleModule } from '@angular/material/core';
import { RouterModule } from "@angular/router";
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
}) export class MastheadComponent {
  toggleDrawer = this.drawerService.toggle;

  constructor (
    private drawerService: DrawerService
  ) {}
}

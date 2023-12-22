import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";

@Component({
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
}) export class HomeComponent implements OnInit {
  ngOnInit() {
    console.log('.1 + .2');
    console.log(.1 + .2);
  }
}

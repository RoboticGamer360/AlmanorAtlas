import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss'],
  imports: [
    CommonModule
  ]
}) export class PopularComponent {
  hotSpots = [{
    title: 'Title, Inc.',
    description: 'A very super cool interesting place to be, tbh',
    bgColor: '#dff5fe'
  }, {
    title: 'Nuclear Party',
    description: 'Such a Blast!',
    bgColor: '#E1308A0D'
  }, {
    title: 'Ball pit',
    description: 'jump on in',
    bgColor: '#c8ffbf'
  }]
}

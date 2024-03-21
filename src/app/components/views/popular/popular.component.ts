import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { API } from '../../../../../api';
import { UtilsService } from "src/app/core/utils/utils.service";

@Component({
  standalone: true,
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss'],
  imports: [
    CommonModule
  ]
}) export class PopularComponent implements OnInit {
  hotSpots!: API.Location[];// = [
    // {
    //   title: 'Title, Inc.',
    //   description: 'A very super cool interesting place to be, tbh',
    //   bgColor: '#dff5fe'
    // },
    // {
    //   title: 'Nuclear Party',
    //   description: 'Such a Blast!',
    //   bgColor: '#E1308A0D'
    // },
    // {
    //   title: 'Ball pit',
    //   description: 'jump on in',
    //   bgColor: '#c8ffbf'
    // }
  // ]

  constructor(private utilsService: UtilsService) {}

  async ngOnInit(): Promise<void> {
    // get locations from api
    const res = await fetch('/api/locations');
    const body: API.LocationsResponse = await res.json();

    if (body.data === undefined) {
      console.error(`Server error:\n`, body.error);
      return
    }

    this.hotSpots ??= [];
    for (let i = 0; i < body.data.length; i++) {
      this.hotSpots.push(body.data[i]);
    }
  }

  bgColorOf(color: string): string {
    const rgb = this.utilsService.hexColorToRGB(color);
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`;
  }
}

import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { API } from '../../../../../api';
import { UtilsService } from "src/app/core/utils/utils.service";

@Component({
  standalone: true,
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'],
  imports: [ CommonModule ]
}) export class FoodComponent implements OnInit {
  bgColorOf = this.utilsService.bgColorOf.bind(this.utilsService);
  locations!: API.FoodLocation[];

  constructor(private utilsService: UtilsService) {}

  async ngOnInit(): Promise<void> {
    const res = await fetch('/api/locations/food');
    const resBody: API.FoodLocationsResponse = await res.json();

    if (resBody.error !== null) {
      console.error('Server error:\n', resBody.error);
      return
    }

    this.locations ??= [];
    for (let i = 0; i < resBody.data.length; i++) {
      this.locations.push(resBody.data[i]);
    }
  }
}

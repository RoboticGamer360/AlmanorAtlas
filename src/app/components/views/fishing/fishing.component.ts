import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { API } from '../../../../../api';
import { UtilsService } from "src/app/core/utils/utils.service";

@Component({
  standalone: true,
  templateUrl: './fishing.component.html',
  styleUrls: ['./fishing.component.scss'],
  imports: [ CommonModule ]
}) export class FishingComponent implements OnInit {
  bgColorOf = this.utilsService.bgColorOf.bind(this.utilsService);
  locations!: API.FishingLocation[];

  constructor(private utilsService: UtilsService) {}

  async ngOnInit(): Promise<void> {
    const res = await fetch('/api/locations/fishing');
    const resBody: API.FishingLocationsResponse = await res.json();

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

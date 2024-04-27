import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { API } from '../../../../../api';
import { UtilsService } from "src/app/core/utils/utils.service";

@Component({
  standalone: true,
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss'],
  imports: [ CommonModule ]
}) export class ShoppingComponent implements OnInit {
  bgColorOf = this.utilsService.bgColorOf.bind(this.utilsService);
  hotSpots!: API.ShoppingLocation[];

  constructor(private utilsService: UtilsService) {}

  async ngOnInit(): Promise<void> {
    const res = await fetch('/api/locations/shopping');
    const resBody: API.ShoppingLocationsResponse = await res.json();

    if (resBody.error !== null) {
      console.error('Server error:\n', resBody.error);
      return
    }

    this.hotSpots ??= [];
    for (let i = 0; i < resBody.data.length; i++) {
      this.hotSpots.push(resBody.data[i]);
    }
  }
}

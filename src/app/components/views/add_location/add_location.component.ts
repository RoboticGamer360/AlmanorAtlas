import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatRippleModule } from "@angular/material/core";
import { Router, RouterModule } from "@angular/router";
import { API } from "api";
import { APIService } from "src/app/core/api/api.service";
import { AuthService } from "src/app/core/auth/auth.service";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatRippleModule
  ],
  templateUrl: './add_location.component.html',
  styleUrls: ['./add_location.component.scss']
}) export class AddLocationComponent implements OnInit {
  locType: 'shopping' | 'food' | 'fishing' | null = null;
  locShop: API.NewShoppingLocationRequest = { name: "", color: "#2962ff" };
  locFood: API.NewFoodLocationRequest = { name: "", color: "#2962ff" };
  locFish: API.NewFishingLocationRequest = { name: "", fish: [], color: "#2962ff" };
  fishInput = '';
  submitShopEnabled = false;
  submitFoodEnabled = false;
  submitFishEnabled = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private apiService: APIService
  ) {}

  async ngOnInit(): Promise<void> {
    const user = await this.authService.verifyToken();
    if (user === null) {
      this.router.navigate(['/']);
    }
  }

  evaluateSubmitButtons(): void {
    switch (this.locType) {
      case 'shopping': {
        if (this.locShop.name.length <= 0) {
          this.submitShopEnabled = false;
          return;
        }

        this.submitShopEnabled = true;
        break;
      }

      case 'food': {
        if (this.locFood.name.length <= 0) {
          this.submitFoodEnabled = false;
          return;
        }

        this.submitFoodEnabled = true;
        break;
      }

      case 'fishing': {
        if (this.locFish.name.length <= 0) {
          this.submitFishEnabled = false;
          return;
        }

        this.submitFishEnabled = true;
        break;
      }
    }
  }

  async onFormSubmit(e?: SubmitEvent | undefined): Promise<void> {
    e?.preventDefault();
    let response: { status: 'success' | 'error' };

    Object.entries(this.locShop).forEach(([key, val]) => {
      if (val === '') {
        // @ts-ignore
        // TypeScript has no way of knowing that `key` always exists on the object.
        delete this.locShop[key];
      }
    });

    switch (this.locType) {
      case 'shopping': {
        response = await this.apiService.addShoppingLocation(this.locShop);
        break;
      }

      case 'food': {
        response = await this.apiService.addFoodLocation(this.locFood);
        break;
      }

      case 'fishing': {
        response = await this.apiService.addFoodLocation(this.locFish);
        break;
      }

      default:
        const err = new Error();
        err.message = "Unknown location type: " + this.locType;
        throw err;
    }

    if (response.status === 'success') {
      alert("Couldn't add location");
    }
  }
}

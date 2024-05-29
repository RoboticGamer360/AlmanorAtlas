import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatRippleModule } from "@angular/material/core";
import { MatDialogModule, MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { API } from "api";
import { APIService } from "src/app/core/api/api.service";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatRippleModule,
    MatDialogModule
  ],
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.scss']
}) export class ContributeComponent {
  locType: 'shopping' | 'food' | 'fishing' | null = null;
  locShop: API.NewShoppingLocationRequest = { name: "", color: "#2962ff" };
  locFood: API.NewFoodLocationRequest = { name: "", color: "#2962ff" };
  locFish: API.NewFishingLocationRequest = { name: "", color: "#2962ff" };
  fishInput = '';
  submitShopEnabled = false;
  submitFoodEnabled = false;
  submitFishEnabled = false;

  constructor(
    private apiService: APIService,
    private dialog: MatDialog,
    private router: Router
  ) {}

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

    try {
      switch (this.locType) {
        case 'shopping': {
          response = await this.apiService.addShoppingLocation(this.locShop, true);
          break;
        }

        case 'food': {
          response = await this.apiService.addFoodLocation(this.locFood, true);
          break;
        }

        case 'fishing': {
          response = await this.apiService.addFoodLocation(this.locFish, true);
          break;
        }

        default:
          const err = new Error();
          err.message = "Unknown location type: " + this.locType;
          throw err;
      }

      if (response.status !== 'success') {
        alert("Whoops! Something went wrong. Please try again later.");
        return;
      }

      const dialogRef = this.dialog.open(SuccessDialog);
      dialogRef.afterClosed().subscribe(() => {
        this.router.navigate(['/']);
      });
    } catch(_err) {
      alert("Whoops! Something went wrong. Make sure you're connected to the internet and try again.");
    }
  }
}

@Component({
  standalone: true,
  selector: 'dlg-success',
  template: '<h2>Success!</h2><p>Your location has been submitted and will be reviewed before publishing. This normally takes 1-2 days.</p><p>Thank you for your contribution!</p><mat-dialog-actions align="end"><button class="btn" mat-dialog-close cdkFocusInitial matRipple matRippleColor="var(--clr-neutral-ripple)">Close</button></mat-dialog-actions>',
  styles: [':host { display: block; padding-inline: 1.5rem; }'],
  imports: [
    MatDialogModule,
    MatRippleModule
  ]
}) class SuccessDialog {}

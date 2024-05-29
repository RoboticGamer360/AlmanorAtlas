import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/auth/auth.service";

@Component({
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './review_contributions.component.html',
  styleUrls: ['./review_contributions.component.scss'],
}) export class ReviewContributionsComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const user = await this.authService.verifyToken();
    if (user === null) {
      this.router.navigate(['/']);
    }
  }
}

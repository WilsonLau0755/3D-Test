import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-model-page',
  standalone: false,
  templateUrl: './model-page.component.html',
  styleUrl: './model-page.component.less'
})
export class ModelPageComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  public navigateBack(): void {
    this.location.back();
  }
}

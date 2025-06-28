import { Component, OnInit } from '@angular/core';
import { BannerData, DataService } from '../../../core/data.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-banner',
  standalone: false,
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.less'
})
export class BannerComponent implements OnInit {

  public banner$: Observable<BannerData[]> = of([]);

  constructor(
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.banner$ = this.dataService.getBanners();
  }

}

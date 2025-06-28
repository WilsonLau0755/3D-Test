import { Component } from '@angular/core';
import { ScreenBreakPoint, SystemService } from '../../../core/system.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.less'
})
export class NavBarComponent {

  public isScreenSM$: Observable<boolean>;
  public readonly taps = [
    { title: '首页', fragment: 'home' },
    { title: '设备材料', fragment: 'list' },
    { title: '关于我们', fragment: 'about' }
  ];
  public searchValue: string = '';

  constructor(
    private systemService: SystemService
  ) {
    this.isScreenSM$ = this.systemService.isScreenWidthSmaller(ScreenBreakPoint.MD).pipe(tap(res => console.log(res)));
  }


}

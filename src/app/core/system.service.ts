import { Injectable } from "@angular/core";
import { BehaviorSubject, debounceTime, fromEvent, map, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  private readonly screenSize = new BehaviorSubject<ScreenSize>({w: window.innerWidth, h: window.innerHeight});
  private readonly screenSize$ = this.screenSize.asObservable();

  constructor() {
    fromEvent(window, 'resize').pipe(debounceTime(300)).subscribe(() => {
      this.screenSize.next({w: window.innerWidth, h: window.innerHeight});
    });
  }

  public getScreenSize(): Observable<ScreenSize> {
    return this.screenSize$;
  }

  /**
   * 判断当前屏幕大小是否小于等于目标大小
   * @param targetSize 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
   * @returns true: 小于等于  false: 大于
   */
  public isScreenWidthSmaller(targetSize: ScreenBreakPoint): Observable<boolean> {
    return this.screenSize$.pipe(
      map(screenSize => screenSize.w <= targetSize)
    );
  }
}

export enum ScreenBreakPoint {
  XS = 576,
  SM = 768,
  MD = 992,
  LG = 1200,
  XL = 1600
}

interface ScreenSize {
  w: number;
  h: number;
}

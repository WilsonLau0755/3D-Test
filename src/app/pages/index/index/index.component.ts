import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter, map, merge, Observable, of } from 'rxjs';

@Component({
  selector: 'app-index',
  standalone: false,
  templateUrl: './index.component.html',
  styleUrl: './index.component.less'
})
export class IndexComponent implements OnInit {

  public isInChildRoute$: Observable<boolean> = of(false);

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 监听路由变化
    const routerNavigationEndRef = this.router.events.pipe(filter((event) => event instanceof NavigationEnd));
    this.isInChildRoute$ = merge(of(null), routerNavigationEndRef).pipe(
      map(() => !!this.route.snapshot.children.length),
      distinctUntilChanged()
    );
    routerNavigationEndRef.subscribe(res => {
      console.log(res, this.route.snapshot);
      this.scrollToSection(this.route.snapshot.fragment);
    })
  }

  private scrollToSection(name: string | null): void {
    if (name) {
      const section = document.getElementById(name);
      if (section) {
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }
  }

}

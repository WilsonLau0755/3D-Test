import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { BannerComponent } from './banner/banner.component';
import { ListComponent } from './list/list.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';


import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { TypePipe } from '../../share/type.pipe';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { CardComponent } from './card/card.component';

const UIModules = [
  NzLayoutModule,
  NzIconModule,
  NzButtonModule,
  NzFlexModule,
  NzInputModule,
  NzGridModule,
  NzCarouselModule,
  NzSpaceModule,
  NzCardModule,
  NzTagModule,
  NzEmptyModule
];

@NgModule({
  declarations: [
    IndexComponent,
    NavBarComponent,
    BannerComponent,
    ListComponent,
    AboutComponent,
    FooterComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ...UIModules,
    TypePipe
  ],
  exports: [
    IndexComponent
  ]
})
export class IndexModule { }

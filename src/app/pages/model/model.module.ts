import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModelRoutingModule } from './model-routing.module';
import { ModelPageComponent } from './model-page/model-page.component';
import { ModelComponent } from './model/model.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

const UIModules = [
  NzLayoutModule,
  NzGridModule,
  NzButtonModule,
  NzIconModule,
  NzFlexModule,
  NzToolTipModule,
  NzResultModule,
  NzModalModule,
  NzProgressModule,
  NzSpaceModule,
  NzTypographyModule
];

@NgModule({
  declarations: [
    ModelPageComponent,
    ModelComponent
  ],
  imports: [
    CommonModule,
    ModelRoutingModule,
    RouterModule,
    FormsModule,
    ...UIModules
  ]
})
export class ModelModule { }

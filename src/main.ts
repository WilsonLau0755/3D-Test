import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AppRoutes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { provideNzI18n, zh_CN } from 'ng-zorro-antd/i18n';
import { provideNgxWebstorage, withLocalStorage, withNgxWebstorageConfig, withSessionStorage } from 'ngx-webstorage';
import { IndexModule } from './app/pages/index/index.module';
import { provideHttpClient } from '@angular/common/http';

registerLocaleData(zh);

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(AppRoutes),
    importProvidersFrom([
      IndexModule
    ]),
    provideNgxWebstorage(
      withNgxWebstorageConfig({prefix: 'Markhit'}),
      withLocalStorage(),
      withSessionStorage()
    ),
    provideNzI18n(zh_CN)
  ]
})
  .catch((err) => console.error(err));

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  NgFastToastComponent,
  ngFastToastConfig,
  NgFastToastService,
} from 'ng-fast-toast';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    NgFastToastComponent,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    NgFastToastService,
    ngFastToastConfig({
      align: 'left',
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

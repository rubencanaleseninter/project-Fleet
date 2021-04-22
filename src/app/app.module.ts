import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { TableModule } from 'primeng/table';
import { PanelMenuModule } from 'primeng/panelmenu';

import { AppComponent } from './app.component';
import { FleetModule } from './modules/fleet/fleet.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TableModule,
    PanelMenuModule,
    FleetModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

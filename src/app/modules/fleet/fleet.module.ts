import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetRoutingModule } from './fleet-routing.module';
import { FleetComponent } from './fleet.component';
import { DriversTableComponent } from './pages/drivers-table/drivers-table.component';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [FleetComponent, DriversTableComponent, VehiclesComponent],
  imports: [CommonModule, FleetRoutingModule, TableModule, DialogModule],
})
export class FleetModule {}

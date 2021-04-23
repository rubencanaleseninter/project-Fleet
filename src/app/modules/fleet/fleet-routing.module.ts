import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriversTableComponent } from './pages/drivers-table/drivers-table.component';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/fleet',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: 'drivers-table',
        component: DriversTableComponent,
      },
      {
        path: 'vehicles-table',
        component: VehiclesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FleetRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiclesTableComponent } from './pages/vehicles-table/vehicles-table.component';

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
        path: 'vehicles-table',
        component: VehiclesTableComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FleetRoutingModule {}

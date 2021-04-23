import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FleetComponent } from './modules/fleet/fleet.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '',
    component: FleetComponent,
    children: [
      {
        path: 'fleet',
        loadChildren: () =>
          import('./modules/fleet/fleet.module').then((m) => m.FleetModule),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  items: MenuItem[] = [
    { label: 'Mi intranet', items: [] },
    { label: 'Dpto. Personas', items: [] },
    {
      label: 'Flota',
      icon: '',
      items: [
        {
          label: 'Vehículos',
          icon: 'fas fa-shuttle-van',
          routerLink: '/fleet/vehicles-table',
        },
        {
          label: 'Conductores',
          icon: 'fas fa-user-friends',
          routerLink: '/fleet/drivers-table',
        },
        {
          label: 'Histórico',
          icon: 'fas fa-file-alt',
          routerLink: '/fleet/vehicles-history',
        },
      ],
    },
  ];
}

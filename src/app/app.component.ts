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
          label: 'Lista de vehículos',
          icon: 'pi pi-fw pi-plus',
          routerLink: '/fleet/vehicles-table',
        },
        {
          label: 'Lista de conductores',
          icon: 'pi pi-fw pi-external-link',
          routerLink: '/fleet/drivers-table',
        },
        { label: 'Histórico', icon: 'pi pi-pw pi-file' },
      ],
    },
  ];
}

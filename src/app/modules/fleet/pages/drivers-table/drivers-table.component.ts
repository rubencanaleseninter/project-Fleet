import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { Driver } from '../../models/driver.model';
import { ApiService } from '../../services/api.service';

@Component({
  templateUrl: './drivers-table.component.html',
  styleUrls: ['./drivers-table.component.scss'],
})
export class DriversTableComponent implements OnInit {
  drivers$: Observable<Driver[]>;
  drivers: Driver[] = [];
  driverCols: any[] = [];
  selectedDriver: any;
  displayDriverDetails = false;
  displayAddDriver = false;
  displayEditDriver = false;

  constructor(public apiService: ApiService) {
    this.drivers$ = this.apiService.getAllDrivers();

    this.driverCols = [
      { field: 'codigoEmpleado', header: 'Id Conductor' },
      { field: 'nombreEmpleado', header: 'Nombre' },
      { field: 'idVehiculo', header: 'Id vehículo' },
    ];
  }

  ngOnInit(): void {
    this.drivers$.subscribe((res) => (this.drivers = res));
  }

  filterGlobal(target: any, dt: Table): void {
    dt.filterGlobal(target.value, 'contains');
  }

  showDriverDetails(rowData: Driver): void {
    this.displayDriverDetails = true;
  }

  showAddDriver(ev: Event): void {
    this.displayAddDriver = true;
  }

  showEditDriver(rowData: Driver): void {
    this.displayEditDriver = true;
  }

  closeRequests(): void {
    console.log('guardado');
  }
}

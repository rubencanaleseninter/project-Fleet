import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { Driver } from './models/driver.model';
import { Vehicle } from './models/fleet.model';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  vehicles$: Observable<Vehicle[]>;
  drivers$: Observable<Driver[]>;

  vehicles: Vehicle[] = [];
  drivers: Driver[] = [];

  driverCols: any[] = [];
  vehicleCols: any[] = [];

  selectedDriver: any;
  displayDriverDetails: boolean = false;
  displayAddDriver: boolean = false;
  displayEditDriver: boolean = false;

  selectedVehicle: any;
  displayVehicleDetails: boolean = false;
  displayAddVehicle: boolean = false;
  displayEditVehicle: boolean = false;

  constructor(public apiService: ApiService) {
    this.vehicles$ = this.apiService.getAllVehicles();
    this.drivers$ = this.apiService.getAllDrivers();

    this.vehicleCols = [
      { field: 'id', header: 'Id' },
      { field: 'matricula', header: 'Matricula' },
      { field: 'bastidor', header: 'Bastidor' },
      { field: 'modelo', header: 'Modelo' },
      { field: 'tipofinanciacion', header: 'Tipo de financiación' },
      { field: 'fechaalta', header: 'Fecha de alta' },
      { field: 'idempresa', header: 'Id empresa' },
      { field: 'kmactual', header: 'Kms actuales' },
      { field: 'idtipovehiculo', header: 'Tipo de vehículo' },
      { field: 'IDtipoCombustible', header: 'Tipo de combustible' },
      { field: 'IDEmpresaFinanciacion', header: 'Id financiera' },
      { field: 'NumeroContrato', header: 'Nº de contrato' },
      { field: 'Kmmaximos', header: 'Kms máximos' },
      { field: 'Cuotamensual', header: 'Cuota mensual' },
      { field: 'Activo', header: 'Estado' },
      { field: 'Observaciones', header: 'Observaciones' },
    ];

    this.driverCols = [
      { field: 'codigoEmpleado', header: 'Id Conductor' },
      { field: 'nombreEmpleado', header: 'Nombre' },
      { field: 'idVehiculo', header: 'Id vehículo' },
    ];
  }

  ngOnInit() {
    this.vehicles$.subscribe((res) => (this.vehicles = res));
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

  showVehicleDetails(rowData: Vehicle): void {
    this.displayVehicleDetails = true;
  }

  showAddVehicle(ev: Event): void {
    this.displayAddVehicle = true;
  }

  showEditVehicle(rowData: Vehicle): void {
    this.displayEditVehicle = true;
  }

  closeRequests(): void {
    console.log('guardado');
  }
}

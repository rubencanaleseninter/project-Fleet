import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { Vehicle } from '../../models/fleet.model';
import { ApiService } from '../../services/api.service';

@Component({
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss'],
})
export class VehiclesComponent implements OnInit {
  vehicles$: Observable<Vehicle[]>;
  vehicles: Vehicle[] = [];
  vehicleCols: any[] = [];
  selectedVehicle: any;
  displayVehicleDetails = false;
  displayAddVehicle = false;
  displayEditVehicle = false;

  constructor(public apiService: ApiService) {
    this.vehicles$ = this.apiService.getAllVehicles();

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
  }

  ngOnInit(): void {
    this.vehicles$.subscribe((res) => (this.vehicles = res));
  }

  filterGlobal(target: any, dt: Table): void {
    dt.filterGlobal(target.value, 'contains');
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

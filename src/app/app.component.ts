import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { Driver } from './models/driver.model';
import { Vehicle } from './models/fleet.model';
import { ApiService } from './services/api.service';

export interface Cols {
  field: string;
  header: string;
  type: string;
  required: boolean;
  disabled: boolean;
  options?: any;
  width?: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // Driver data
  driverArray!: Driver[];
  driverCols!: any[];
  driverFilters!: string[];
  displayDriverDetails = false;
  displayFormDriverModal = false;
  // Vehicle data
  vehicleArray!: Vehicle[];
  vehicleCols!: Cols[];
  vehicleFilters!: string[];
  displayVehicleDetails = false;
  displayFormVehicleModal = false;
  // Forms
  formVehicleGroup = new FormGroup({});
  formDriverGroup = new FormGroup({});

  constructor(
    public apiService: ApiService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // TODO: Remove setTimeout, skeleton test
    setTimeout(() => {
      this.getData();
    }, 1000);
  }

  /**
   * Get the vehicles & drivers subscription data
   */
  getData(): void {
    const vehicles$ = this.apiService.getAllVehicles();
    const drivers$ = this.apiService.getAllDrivers();
    const vehicleIds$ = this.apiService.getVehicleIds();
    const financingTypes$ = this.apiService.getFinancingTypes();
    const vehicleTypes$ = this.apiService.getVehicleTypes();
    const combustibleTypes$ = this.apiService.getCombustibleTypes();
    const transmissionTypes$ = this.apiService.getTransmissionTypes();

    forkJoin([
      vehicles$,
      drivers$,
      vehicleIds$,
      financingTypes$,
      vehicleTypes$,
      combustibleTypes$,
      transmissionTypes$
    ]).subscribe(
      ([
        vehicles,
        drivers,
        vehicleIds,
        financingTypes,
        vehicleTypes,
        combustibleTypes,
        transmissionTypes
      ]) => {
        this.vehicleArray = vehicles;
        this.driverArray = drivers;

        this.createColums(
          vehicleIds,
          financingTypes,
          vehicleTypes,
          combustibleTypes,
          transmissionTypes
        );
        this.createFilters();
        this.createVehicleForm();
        this.createDriverForm();
      }
    );
  }

  /**
   * Create the driver forms modal
   */
  createDriverForm(): void {
    this.formDriverGroup = new FormGroup({});
    this.driverCols.forEach((col) =>
      this.formDriverGroup.addControl(
        col.field,
        col.required
          ? this.fb.control(
              { value: null, disabled: col.disabled },
              Validators.required
            )
          : this.fb.control({ value: null, disabled: col.disabled })
      )
    );
  }

  /**
   * Create the vehicle forms modal
   */
  createVehicleForm(): void {
    this.formVehicleGroup = new FormGroup({});
    this.vehicleCols.forEach((col) => {
      this.formVehicleGroup.addControl(
        col.field,
        col.required
          ? this.fb.control(
              { value: null, disabled: col.disabled },
              Validators.required
            )
          : this.fb.control({ value: null, disabled: col.disabled })
      );
    });
  }

  /**
   * Create the columns of the tables
   */
  createColums(
    vehicleIds: any[],
    financingTypes: any[],
    vehicleTypes: any[],
    combustibleTypes: any[],
    transmissionTypes: any []
  ): void {
    this.vehicleCols = [
      {
        field: 'id',
        header: 'Id',
        type: 'input',
        disabled: true,
        required: false,
        width: '80px',
      },
      {
        field: 'matricula',
        header: 'Matricula',
        type: 'input',
        disabled: false,
        required: true,
        width: '100px',
      },
      {
        field: 'bastidor',
        header: 'Bastidor',
        type: 'input',
        disabled: false,
        required: true,
        width: '120px',
      },
      {
        field: 'modelo',
        header: 'Modelo',
        type: 'input',
        disabled: false,
        required: true,
        width: '220px',
      },
      {
        field: 'tipofinanciacion',
        header: 'Tipo de financiación',
        type: 'select',
        disabled: false,
        required: true,
        options: financingTypes,
        width: '100px',
      },
      {
        field: 'fechaalta',
        header: 'Fecha de alta',
        type: 'date',
        disabled: false,
        required: true,
        width: '120px',
      },
      {
        field: 'IDempleado',
        header: 'Id Conductor',
        type: 'input',
        disabled: false,
        required: false,
        width: '100px',
      },
      {
        field: 'idempresa',
        header: 'Id empresa',
        type: 'input',
        disabled: false,
        required: true,
        width: '100px',
      },
      {
        field: 'kmactual',
        header: 'Kms actuales',
        type: 'input',
        disabled: false,
        required: true,
        width: '100px',
      },
      {
        field: 'idtipovehiculo',
        header: 'Tipo de vehículo',
        type: 'select',
        disabled: false,
        required: true,
        options: vehicleTypes,
        width: '100px',
      },
      {
        field: 'IDtipoCombustible',
        header: 'Tipo de combustible',
        type: 'select',
        disabled: false,
        required: true,
        options: combustibleTypes,
        width: '100px',
      },
      {
        field: 'emisiones',
        header: 'Emisiones',
        type: 'input',
        disabled: false,
        required: true,
        width: '100px',
      },
      {
        field: 'IDtipoTransmision',
        header: 'Tipo de transmisión',
        type: 'select',
        disabled: false,
        required: true,
        options: transmissionTypes,
        width: '100px',
      },
      {
        field: 'IDEmpresaFinanciacion',
        header: 'Id financiera',
        type: 'input',
        disabled: false,
        required: true,
        width: '100px',
      },
      {
        field: 'NumeroContrato',
        header: 'Nº de contrato',
        type: 'input',
        disabled: false,
        required: true,
        width: '100px',
      },
      {
        field: 'Kmmaximos',
        header: 'Kms máximos',
        type: 'input',
        disabled: false,
        required: true,
        width: '100px',
      },
      {
        field: 'Cuotamensual',
        header: 'Cuota mensual',
        type: 'input',
        disabled: false,
        required: true,
        width: '100px',
      },
      {
        field: 'Activo',
        header: 'Estado',
        type: 'checkbox',
        disabled: false,
        required: true,
        width: '80px',
      },
      {
        field: 'Observaciones',
        header: 'Observaciones',
        type: 'textarea',
        disabled: false,
        required: false,
        width: '200px',
      },
    ];

    this.driverCols = [
      {
        field: 'codigoEmpleado',
        header: 'Id Conductor',
        type: 'input',
        disabled: true,
        required: false,
      },
      {
        field: 'nombreEmpleado',
        header: 'Nombre',
        type: 'input',
        disabled: false,
        required: true,
      },
      {
        field: 'idVehiculo',
        header: 'Matrícula vehículo',
        type: 'select',
        disabled: false,
        required: false,
        options: vehicleIds,
      },
    ];
  }

  /**
   * Create field filters
   */
  createFilters(): void {
    this.driverFilters = this.driverCols.map((col) => col.field);
    this.vehicleFilters = this.vehicleCols.map((col) => col.field);
  }

  /**
   * Display detail modal
   * @param rowData Vehicle or Driver
   */
  showDetailModal(rowData: any, type: string): void {
    if (type === 'driver') {
      this.apiService.selectedDriver = rowData;
      this.displayDriverDetails = true;
      return;
    }
    if (type === 'vehicle') {
      this.apiService.selectedVehicle = rowData;
      this.displayVehicleDetails = true;
    }
  }

  /**
   * Display edit modal
   * @param rowData Vehicle or Driver
   */
  showEditModal(rowData: any, type: string): void {
    if (type === 'driver') {
      this.displayFormDriverModal = true;
      this.formDriverGroup.patchValue(rowData);
      return;
    }
    if (type === 'vehicle') {
      this.displayFormVehicleModal = true;
      this.formVehicleGroup.patchValue(rowData);
    }
  }

  /**
   * Display add modal
   */
  showAddModal(type: string): void {
    this.formDriverGroup.reset();
    this.formVehicleGroup.reset();
    type === 'driver'
      ? (this.displayFormDriverModal = true)
      : (this.displayFormVehicleModal = true);
  }

  /**
   * Save form data on edit or create new
   * @param type 'driver' or 'vehicle'
   */
  saveData(type: string): void {
    let data;
    if (type === 'driver') {
      if (this.formDriverGroup.invalid) {
        this.displayMessage('error', 'Revise el formulario');
      } else {
        data = new Driver(this.formDriverGroup.value);
        this.apiService.saveDriver(data).subscribe(() => {
          this.displayFormDriverModal = false;
          this.displayMessage('success', 'Conductor guardado correctamente');
        });
      }
      return;
    }
    if (type === 'vehicle') {
      if (this.formVehicleGroup.invalid) {
        this.displayMessage('error', 'Revise el formulario');
      } else {
        data = new Vehicle(this.formVehicleGroup.value);
        this.apiService.saveVehicle(data).subscribe(() => {
          this.displayFormVehicleModal = false;
          this.displayMessage('success', 'Vehículo guardado correctamente');
        });
      }
    }
  }

  /**
   * Delete the selected row
   * @param rowData Driver | Vehicle
   * @param type 'driver' or 'vehicle'
   */
  deleteRowData(rowData: any, type: string): void {
    if (type === 'driver') {
      if (rowData.idVehiculo.length > 0) {
        this.displayMessage(
          'error',
          'Este conductor tiene vehiculo asignado y no se puede eliminar'
        );
      } else {
        this.apiService.deleteDriver(rowData.id).subscribe(() => {
          this.displayMessage('success', 'Conductor eliminado correctamente');
        });
      }
      return;
    }
    if (type === 'vehicle') {
      if (rowData.Activo) {
        this.displayMessage(
          'error',
          'Este vehiculo se encuentra activo y no se puede eliminar'
        );
      } else {
        this.apiService.deleteVehicle(rowData.id).subscribe(() => {
          this.displayMessage('success', 'Vehículo eliminado correctamente');
        });
      }
    }
  }

  /**
   * Show toast message
   * @param severity "success", "info", "warn" or "error".
   * @param summary string message.
   */
  displayMessage(severity: string, summary: string): void {
    this.messageService.add({
      severity,
      summary,
    });
  }
}

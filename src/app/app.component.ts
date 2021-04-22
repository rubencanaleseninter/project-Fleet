/*************************************************************
 * TODO:                                                     *
 * Add router-outlet to html                                 *
 * Add new fleet-module to app.routing                       *
 * Add new vehicle and driver components to the fleet module *
 * Add component routes to fleet.routing                     *
 * Move code from app.component.ts, app.component.html       *
 * app.component.scss to specific components                 *
 * Remove code from app ts, html ,scss                       *
 * Add menu or menuTab to the fleet module                   *
 * Test routes                                               *
 *************************************************************/

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
  type?: string;
  required?: boolean;
  disabled?: boolean;
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
  vehicleTableCols!: Cols[];
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
    // FIXME: Remove setTimeout, skeleton test
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
    const manufacturerTypes$ = this.apiService.getManufacturers();
    const vehicleModels$ = this.apiService.getVehicleModels();
    const environmentLabelTypes$ = this.apiService.getEnvironmentLabelTypes();

    forkJoin([
      vehicles$,
      drivers$,
      vehicleIds$,
      financingTypes$,
      vehicleTypes$,
      combustibleTypes$,
      transmissionTypes$,
      manufacturerTypes$,
      vehicleModels$,
      environmentLabelTypes$,
    ]).subscribe(
      ([
        vehicles,
        drivers,
        vehicleIds,
        financingTypes,
        vehicleTypes,
        combustibleTypes,
        transmissionTypes,
        manufacturerTypes,
        vehicleModels,
        environmentLabelTypes,
      ]) => {
        this.vehicleArray = vehicles;
        this.driverArray = drivers;

        this.createVehicleColums(
          financingTypes,
          vehicleTypes,
          combustibleTypes,
          transmissionTypes,
          manufacturerTypes,
          vehicleModels,
          environmentLabelTypes
        );
        this.createVehicleTableColums();
        this.createDriverColumns(vehicleIds);
        this.createDriverFilters();
        this.createVehicleFilters();
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

  createDriverColumns(vehicleIds: any[]): void {
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
  createDriverFilters(): void {
    this.driverFilters = this.driverCols.map((col) => col.field);
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

  /** ========== VEHICLE ========== */

  /**
   * Create the columns of the tables
   */
  createVehicleColums(
    financingTypes: any[],
    vehicleTypes: any[],
    combustibleTypes: any[],
    transmissionTypes: any[],
    manufacturerTypes: any[],
    vehicleModels: any[],
    environmentLabelTypes: any[]
  ): void {
    this.vehicleCols = [
      {
        field: 'rowId',
        header: 'Id',
        type: 'input',
        disabled: true,
        required: false,
      },
      {
        field: 'plate',
        header: 'Matricula',
        type: 'input',
        disabled: false,
        required: true,
      },
      {
        field: 'carframe',
        header: 'Bastidor',
        type: 'input',
        disabled: false,
        required: true,
      },
      {
        field: 'manufacturerId',
        header: 'Marca',
        type: 'select',
        disabled: false,
        required: true,
        options: manufacturerTypes,
      },
      {
        field: 'modelId',
        header: 'Modelo',
        type: 'select',
        disabled: false,
        required: true,
        options: vehicleModels,
      },
      {
        field: 'financingTypeId',
        header: 'Tipo de financiación',
        type: 'select',
        disabled: false,
        required: true,
        options: financingTypes,
      },
      {
        field: 'entryDate',
        header: 'Fecha de alta',
        type: 'date',
        disabled: false,
        required: true,
      },
      {
        field: 'leavingDate',
        header: 'Fecha de baja',
        type: 'date',
        disabled: false,
        required: false,
      },
      {
        field: 'employeeId',
        header: 'Id Conductor',
        type: 'input',
        disabled: false,
        required: false,
      },
      {
        field: 'assignedAtCompanyId',
        header: 'Id empresa',
        type: 'input',
        disabled: false,
        required: true,
      },
      {
        field: 'mileage',
        header: 'Kms actuales',
        type: 'input',
        disabled: false,
        required: true,
      },
      {
        field: 'vehicleTypeId',
        header: 'Tipo de vehículo',
        type: 'select',
        disabled: false,
        required: true,
        options: vehicleTypes,
      },
      {
        field: 'fuelTypeId',
        header: 'Tipo de combustible',
        type: 'select',
        disabled: false,
        required: true,
        options: combustibleTypes,
      },
      {
        field: 'pollutingEmissions',
        header: 'Emisiones',
        type: 'input',
        disabled: false,
        required: false,
      },
      {
        field: 'transmissionTypeId',
        header: 'Tipo de transmisión',
        type: 'select',
        disabled: false,
        required: true,
        options: transmissionTypes,
      },
      {
        field: 'financialCompanyId',
        header: 'Id financiera',
        type: 'input',
        disabled: false,
        required: true,
      },
      {
        field: 'contractNumber',
        header: 'Nº de contrato',
        type: 'input',
        disabled: false,
        required: true,
      },
      {
        field: 'maxMileage',
        header: 'Kms máximos',
        type: 'input',
        disabled: false,
        required: true,
      },
      {
        field: 'monthlyFee',
        header: 'Cuota mensual',
        type: 'input',
        disabled: false,
        required: true,
      },
      {
        field: 'active',
        header: 'Estado',
        type: 'checkbox',
        disabled: false,
        required: true,
      },
      {
        field: 'environmentLabelId',
        header: 'Etiqueta medioambiental',
        type: 'select',
        disabled: false,
        required: false,
        options: environmentLabelTypes,
      },
      {
        field: 'fuelConsumption',
        header: 'Consumo',
        type: 'input',
        disabled: false,
        required: false,
      },
      {
        field: 'observations',
        header: 'Observaciones',
        type: 'textarea',
        disabled: false,
        required: false,
      },
    ];
  }

  /**
   * Create the columns of the tables
   */
  createVehicleTableColums(): void {
    this.vehicleTableCols = [
      {
        field: 'rowId',
        header: 'Id',
        width: '80px',
      },
      {
        field: 'plate',
        header: 'Matricula',
        width: '100px',
      },
      {
        field: 'carframe',
        header: 'Bastidor',
        width: '120px',
      },
      {
        field: 'manufacturerName',
        header: 'Marca',
        width: '220px',
      },
      {
        field: 'modelName',
        header: 'Modelo',
        width: '220px',
      },
      {
        field: 'financingTypeName',
        header: 'Tipo de financiación',
        width: '100px',
      },
      {
        field: 'entryDate',
        header: 'Fecha de alta',
        width: '120px',
      },
      {
        field: 'leavingDate',
        header: 'Fecha de baja',
        width: '120px',
      },
      {
        field: 'employeeName',
        header: 'Conductor',
        width: '100px',
      },
      {
        field: 'assignedAtCompanyName',
        header: 'Empresa',
        width: '100px',
      },
      {
        field: 'mileage',
        header: 'Kms actuales',
        width: '100px',
      },
      {
        field: 'vehicleTypeName',
        header: 'Tipo de vehículo',
        width: '100px',
      },
      {
        field: 'fuelTypeName',
        header: 'Tipo de combustible',
        width: '100px',
      },
      {
        field: 'pollutingEmissions',
        header: 'Emisiones',
        width: '100px',
      },
      {
        field: 'transmissionTypeName',
        header: 'Tipo de transmisión',
        width: '100px',
      },
      {
        field: 'financialCompanyName',
        header: 'Financiera',
        width: '100px',
      },
      {
        field: 'contractNumber',
        header: 'Nº de contrato',
        width: '100px',
      },
      {
        field: 'maxMileage',
        header: 'Kms máximos',
        width: '100px',
      },
      {
        field: 'monthlyFee',
        header: 'Cuota mensual',
        width: '100px',
      },
      {
        field: 'active',
        header: 'Estado',
        width: '80px',
      },
      {
        field: 'environmentLabelName',
        header: 'Etiqueta medioambiental',
        width: '100px',
      },
      {
        field: 'fuelConsumption',
        header: 'Consumo',
        width: '80px',
      },
      {
        field: 'observations',
        header: 'Observaciones',
        width: '200px',
      },
    ];
  }

  createVehicleFilters(): void {
    this.vehicleFilters = this.vehicleCols.map((col) => col.field);
  }

  /**
   * Display vehicle detail modal
   * @param rowData Vehicle
   */
  showVehicleDetails(rowData: Vehicle): void {
    this.apiService.selectedVehicle = rowData;
    this.displayVehicleDetails = true;
  }

  /**
   * Display edit vehicle modal
   * @param rowData Vehicle
   */
  showEditVehicle(rowData: Vehicle): void {
    this.apiService.getVehicle(rowData.rowId).subscribe((res) => {
      this.displayFormVehicleModal = true;
      this.formVehicleGroup.patchValue(res);
    });
  }

  /**
   * Display add vehicle modal
   */
  showAddVehicle(): void {
    this.formVehicleGroup.reset();
    this.displayFormVehicleModal = true;
  }
  /**
   * Save the vehicle form on edit or create new
   */
  saveVehicle(): void {
    if (this.formVehicleGroup.invalid) {
      this.displayMessage('error', 'Revise el formulario');
    } else {
      let vehicle = Object.assign(this.formVehicleGroup.value, new Vehicle());
      vehicle = this.formVehicleGroup.value;
      // TODO: Call this.apiService.saveVehicle(vehicle).subscribe(()=>{this.displayEditVehicle = false;this.displayMessage('success', 'Vehículo guardado correctamente');});
      this.displayFormVehicleModal = false;
      this.displayMessage('success', 'Vehículo guardado correctamente');
    }
  }

  /**
   * Remove the selected vehicle
   * @param rowData Vehicle
   */
  removeVehicle(rowData: Vehicle): void {
    if (rowData.active) {
      this.displayMessage(
        'error',
        'Este vehiculo se encuentra activo y no se puede eliminar'
      );
    } else {
      // TODO: Call this.apiService.deleteVehicle(rowData.rowId).subscribe(()=>{this.displayMessage('success', 'Vehículo eliminado correctamente');});
    }
  }

  /** ========== DRIVER ========== */

  /**
   * Display driver detail modal
   * @param rowData Driver
   */
  showDriverDetails(rowData: Driver): void {
    this.apiService.selectedDriver = rowData;
    this.displayDriverDetails = true;
  }

  /**
   * Display add driver modal
   */
  showAddDriver(): void {
    this.formDriverGroup.reset();
    this.displayFormDriverModal = true;
  }

  /**
   * Display edit driver modal
   * @param rowData Driver
   */
  showEditDriver(rowData: Driver): void {
    this.displayFormDriverModal = true;
    this.formDriverGroup.patchValue(rowData);
  }

  /**
   * Save the driver form on edit or create new
   */
  saveDriver(): void {
    if (this.formDriverGroup.invalid) {
      this.displayMessage('error', 'Revise el formulario');
    } else {
      let driver = new Driver();
      driver = this.formDriverGroup.value;
      // FIXME: Call this.apiService.saveDriver(driver).subscribe(()=>{this.displayEditDriver = false;this.displayMessage('success', 'Conductor guardado correctamente');});
      this.displayFormDriverModal = false;
      this.displayMessage('success', 'Conductor guardado correctamente');
    }
  }

  /**
   * Remove the selected driver
   * @param rowData Driver
   */
  removeDriver(rowData: Driver): void {
    if (rowData.idVehiculo.length > 0) {
      this.displayMessage(
        'error',
        'Este conductor tiene vehiculo asignado y no se puede eliminar'
      );
    } else {
      // FIXME: Call this.apiService.deleteDriver(rowData.id).subscribe(()=>{this.displayMessage('success', 'Conductor eliminado correctamente');});
    }
  }
}

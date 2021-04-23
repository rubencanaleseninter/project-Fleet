import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { Vehicle } from '../../models/fleet.model';
import { VehicleApiService } from '../../services/vehicle-api.service';

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
  templateUrl: './vehicles-table.component.html',
  styleUrls: ['./vehicles-table.component.scss'],
})
export class VehiclesTableComponent implements OnInit {
  vehicleArray!: Vehicle[];
  vehicleCols!: Cols[];
  vehicleTableCols!: Cols[];
  vehicleFilters!: string[];
  displayVehicleDetails = false;
  displayFormVehicleModal = false;
  formVehicleGroup = new FormGroup({});

  constructor(
    public vehicleService: VehicleApiService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  /**
   * Get the vehicles & drivers subscription data
   */
  getData(): void {
    const vehicles$ = this.vehicleService.getAllVehicles();
    const financingTypes$ = this.vehicleService.getFinancingTypes();
    const vehicleTypes$ = this.vehicleService.getVehicleTypes();
    const combustibleTypes$ = this.vehicleService.getCombustibleTypes();
    const transmissionTypes$ = this.vehicleService.getTransmissionTypes();
    const manufacturerTypes$ = this.vehicleService.getManufacturers();
    const vehicleModels$ = this.vehicleService.getVehicleModels();
    const environmentLabelTypes$ = this.vehicleService.getEnvironmentLabelTypes();

    forkJoin([
      vehicles$,
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
        financingTypes,
        vehicleTypes,
        combustibleTypes,
        transmissionTypes,
        manufacturerTypes,
        vehicleModels,
        environmentLabelTypes,
      ]) => {
        this.vehicleArray = vehicles;

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
        this.createVehicleFilters();
        this.createVehicleForm();
      }
    );
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
        header: 'Código empleado/a',
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
    this.vehicleService.selectedVehicle = rowData;
    this.displayVehicleDetails = true;
  }

  /**
   * Display edit vehicle modal
   * @param rowData Vehicle
   */
  showEditVehicle(rowData: Vehicle): void {
    this.vehicleService.getVehicle(rowData.rowId).subscribe((res) => {
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
      // FIXME: Call this.vehicleService.saveVehicle(vehicle).subscribe(()=>{this.displayEditVehicle = false;this.displayMessage('success', 'Vehículo guardado correctamente');});
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
      // FIXME: Call this.vehicleService.deleteVehicle(rowData.rowId).subscribe(()=>{this.displayMessage('success', 'Vehículo eliminado correctamente');});
    }
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { Columns } from '../../interfaces/columns';
import { VehicleDto } from '../../interfaces/fleet.interface';
import { Vehicle } from '../../models/fleet.model';
import { VehicleApiService } from '../../services/vehicle-api.service';

@Component({
  templateUrl: './vehicles-table.component.html',
  styleUrls: ['./vehicles-table.component.scss'],
})
export class VehiclesTableComponent implements OnInit {
  vehicleArray!: Vehicle[];
  fields!: Columns[];
  cols!: Columns[];
  filters!: string[];
  formGroup!: FormGroup;
  displayDetails = false;
  displayForm = false;
  private _selectedCols!: Columns[];

  @Input() get selectedCols(): any[] {
    return this._selectedCols;
  }

  set selectedCols(val: any[]) {
    this._selectedCols = this.cols.filter((col) => val.includes(col));
  }

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
    const delegations$ = this.vehicleService.getDelegations();
    const employees$ = this.vehicleService.getEmployees();

    forkJoin([
      vehicles$,
      financingTypes$,
      vehicleTypes$,
      combustibleTypes$,
      transmissionTypes$,
      manufacturerTypes$,
      vehicleModels$,
      environmentLabelTypes$,
      delegations$,
      employees$,
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
        delegations,
        employees,
      ]) => {
        this.vehicleArray = vehicles;
        this.createFields(
          financingTypes,
          vehicleTypes,
          combustibleTypes,
          transmissionTypes,
          manufacturerTypes,
          vehicleModels,
          environmentLabelTypes,
          delegations,
          employees
        );
        this.createColums();
        this.createFilters();
        this.createForm();
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
  createForm(): void {
    this.formGroup = new FormGroup({});
    this.fields.forEach((f) => {
      this.formGroup.addControl(
        f.field,
        f.required
          ? this.fb.control(
              { value: null, disabled: f.disabled },
              Validators.required
            )
          : this.fb.control({ value: null, disabled: f.disabled })
      );
    });
  }

  /**
   * Create form fields
   */
  createFields(
    financingTypes: any[],
    vehicleTypes: any[],
    combustibleTypes: any[],
    transmissionTypes: any[],
    manufacturerTypes: any[],
    vehicleModels: any[],
    environmentLabelTypes: any[],
    delegations: any[],
    employees: any[]
  ): void {
    this.fields = [
      // {
      //   field: 'rowId',
      //   header: 'Id',
      //   type: 'input',
      //   disabled: true,
      //   required: false,
      // },
      {
        field: 'active',
        header: '',
        type: 'checkbox',
        disabled: false,
        required: true,
      },
      {
        field: 'plate',
        header: 'Matricula',
        type: 'input',
        placeholder: 'requerido',
        disabled: false,
        required: true,
      },
      {
        field: 'carframe',
        header: 'Bastidor',
        type: 'input',
        placeholder: 'requerido',
        disabled: false,
        required: true,
      },
      {
        field: 'manufacturerId',
        header: 'Marca',
        type: 'select',
        placeholder: 'requerido',
        disabled: false,
        required: true,
        options: manufacturerTypes,
      },
      {
        field: 'modelId',
        header: 'Modelo',
        type: 'select',
        placeholder: 'requerido',
        disabled: false,
        required: true,
        options: vehicleModels,
      },
      {
        field: 'financingTypeId',
        header: 'Tipo de financiación',
        type: 'select',
        placeholder: 'requerido',
        disabled: false,
        required: true,
        options: financingTypes,
      },
      {
        field: 'entryDate',
        header: 'Fecha de alta',
        type: 'date',
        disabled: false,
        required: false,
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
        header: 'Conductor',
        type: 'select',
        disabled: false,
        required: false,
        options: employees,
      },
      {
        field: 'assignedAtCompanyId',
        header: 'Empresa',
        type: 'select',
        placeholder: 'requerido',
        disabled: false,
        required: true,
        options: delegations,
      },
      {
        field: 'mileage',
        header: 'Kms actuales',
        type: 'input',
        placeholder: 'requerido',
        disabled: false,
        required: true,
      },
      {
        field: 'vehicleTypeId',
        header: 'Tipo de vehículo',
        type: 'select',
        placeholder: 'requerido',
        disabled: false,
        required: true,
        options: vehicleTypes,
      },
      {
        field: 'fuelTypeId',
        header: 'Tipo de combustible',
        type: 'select',
        placeholder: 'requerido',
        disabled: false,
        required: true,
        options: combustibleTypes,
      },
      {
        field: 'pollutingEmissions',
        header: 'Emisiones',
        type: 'input',
        placeholder: 'g/km',
        disabled: false,
        required: false,
      },
      {
        field: 'transmissionTypeId',
        header: 'Tipo de transmisión',
        type: 'select',
        placeholder: 'requerido',
        disabled: false,
        required: true,
        options: transmissionTypes,
      },
      {
        field: 'financialCompanyId',
        header: 'Id financiera',
        type: 'input',
        placeholder: 'requerido',
        disabled: false,
        required: true,
      },
      {
        field: 'contractNumber',
        header: 'Nº de contrato',
        type: 'input',
        placeholder: 'requerido',
        disabled: false,
        required: true,
      },
      {
        field: 'maxMileage',
        header: 'Kms máximos',
        type: 'input',
        placeholder: 'requerido',
        disabled: false,
        required: true,
      },
      {
        field: 'monthlyFee',
        header: 'Cuota mensual',
        type: 'input',
        placeholder: 'requerido',
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
        placeholder: 'l/100Km',
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
   * Create the columns of the table
   */
  createColums(): void {
    this.cols = [
      // {
      //   field: 'rowId',
      //   header: 'Id',
      //   width: '80px',
      // },
      {
        field: 'plate',
        header: 'Matricula',
        width: '100px',
      },
      {
        field: 'carframe',
        header: 'Bastidor',
        width: '180px',
      },
      {
        field: 'manufacturerName',
        header: 'Marca',
        width: '120px',
      },
      {
        field: 'modelName',
        header: 'Modelo',
        width: '180px',
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
        width: '120px',
      },
      {
        field: 'mileage',
        header: 'Kms actuales',
        width: '100px',
        placeholder: 'kms',
      },
      {
        field: 'vehicleTypeName',
        header: 'Tipo de vehículo',
        width: '100px',
      },
      {
        field: 'fuelTypeName',
        header: 'Tipo de combustible',
        width: '120px',
      },
      {
        field: 'pollutingEmissions',
        header: 'Emisiones',
        width: '100px',
        placeholder: 'g/km',
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
        placeholder: 'kms',
      },
      {
        field: 'monthlyFee',
        header: 'Cuota mensual',
        width: '100px',
        placeholder: '€/mes',
      },
      {
        field: 'active',
        header: 'Estado',
        width: '100px',
      },
      {
        field: 'environmentLabelName',
        header: 'Etiqueta med.',
        width: '100px',
      },
      {
        field: 'fuelConsumption',
        header: 'Consumo l/100km',
        width: '100px',
        placeholder: 'l/100km',
      },
      {
        field: 'observations',
        header: 'Observaciones',
        width: '200px',
      },
    ];
    this._selectedCols = this.cols;
  }

  createFilters(): void {
    this.filters = this.selectedCols.map((col) => col.field);
  }

  /**
   * Display vehicle detail modal
   * @param rowData Vehicle
   */
  showVehicleDetails(rowData: Vehicle): void {
    this.vehicleService.getVehicle(rowData.plate).subscribe((res) => {
      this.vehicleService.selectedVehicle = res;
      this.displayDetails = true;
    });
  }

  /**
   * Display edit vehicle modal
   * @param rowData Vehicle
   */
  showEditVehicle(rowData: Vehicle): void {
    this.vehicleService.getVehicleDto(rowData.plate).subscribe((res) => {
      this.displayForm = true;
      this.formGroup.patchValue(res);
    });
  }

  /**
   * Display add vehicle modal
   */
  showAddVehicle(): void {
    this.formGroup.reset();
    this.displayForm = true;
  }

  /**
   * Save the vehicle form on edit or create new
   */
  saveVehicle(): void {
    if (this.formGroup.invalid) {
      this.displayMessage('error', 'Revise el formulario');
    } else {
      let vehicle = Object.assign(this.formGroup.value, new Vehicle());
      vehicle = this.formGroup.value;
      // FIXME: Call this.vehicleService.saveVehicle(vehicle).subscribe(()=>{this.displayEditVehicle = false;this.displayMessage('success', 'Vehículo guardado correctamente');});
      this.displayForm = false;
      this.displayMessage('success', 'Vehículo guardado correctamente');
    }
  }

  /**
   * Remove the selected vehicle
   * @param rowData Vehicle
   */
  removeVehicle(rowData: VehicleDto): void {
    if (rowData.active) {
      this.displayMessage(
        'error',
        'Este vehiculo se encuentra activo y no se puede eliminar'
      );
    } else {
      // FIXME: Call this.vehicleService.deleteVehicle(rowData.plate).subscribe(()=>{this.displayMessage('success', 'Vehículo eliminado correctamente');});
    }
  }
}

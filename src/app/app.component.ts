import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { forkJoin, Observable } from 'rxjs';
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
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // Observables
  drivers$: Observable<any>;
  vehicles$: Observable<any>;
  // Driver data
  driverArray!: Driver[];
  driverCols: any[] = [];
  displayDriverDetails = false;
  displayAddDriver = false;
  displayEditDriver = false;
  // Vehicle data
  vehicleArray!: Vehicle[];
  vehicleCols!: Cols[];
  vehicleIds: any[] = [{ name: 'No asignado', value: 0 }];
  displayVehicleDetails = false;
  displayAddVehicle = false;
  displayEditVehicle = false;
  // Forms
  formVehicleGroup!: FormGroup;
  formDriverGroup!: FormGroup;

  constructor(
    public apiService: ApiService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.vehicles$ = this.apiService.getAllVehicles();
    this.drivers$ = this.apiService.getAllDrivers();
  }

  ngOnInit(): void {
    this.getData();
    this.createCols();
    this.createVehicleForm();
    this.createDriverForm();
  }

  getData(): void {
    forkJoin([this.vehicles$, this.drivers$]).subscribe(
      ([vehicles, drivers]) => {
        this.vehicleArray = vehicles;
        this.driverArray = drivers;
        // FIXME: On has API, remove this part
        vehicles.forEach((vh: Vehicle) => {
          this.vehicleIds.push({ name: vh.id.toString(), value: vh.id });
        });
      }
    );
  }

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

  createCols(): void {
    this.vehicleCols = [
      {
        field: 'id',
        header: 'Id',
        type: 'input',
        disabled: true,
        required: false,
      },
      {
        field: 'matricula',
        header: 'Matricula',
        type: 'input',
        disabled: false,
        required: true,
      },
      {
        field: 'bastidor',
        header: 'Bastidor',
        type: 'input',
        disabled: false,
        required: true,
      },
      {
        field: 'modelo',
        header: 'Modelo',
        type: 'input',
        disabled: false,
        required: true,
      },
      {
        field: 'tipofinanciacion',
        header: 'Tipo de financiación',
        type: 'select',
        disabled: false,
        required: true,
        options: [
          { name: 'banco', value: 1 },
          { name: 'renting', value: 2 },
          { name: 'leasing', value: 3 },
        ],
      },
      {
        field: 'fechaalta',
        header: 'Fecha de alta',
        type: 'input',
        disabled: false,
        required: true,
      },
      {
        field: 'idempresa',
        header: 'Id empresa',
        type: 'input',
        disabled: false,
        required: true,
      },
      {
        field: 'kmactual',
        header: 'Kms actuales',
        type: 'input',
        disabled: false,
        required: true,
      },
      {
        field: 'idtipovehiculo',
        header: 'Tipo de vehículo',
        type: 'select',
        disabled: false,
        required: true,
        options: [
          { name: 'turismo', value: 1 },
          { name: 'comercial', value: 2 },
          { name: 'motocicleta', value: 3 },
        ],
      },
      {
        field: 'IDtipoCombustible',
        header: 'Tipo de combustible',
        type: 'select',
        disabled: false,
        required: true,
        options: [
          { name: 'gasolina', value: '1' },
          { name: 'diesel', value: '2' },
          { name: 'híbrido', value: '3' },
          { name: 'eléctrico', value: '4' },
        ],
      },
      {
        field: 'IDEmpresaFinanciacion',
        header: 'Id financiera',
        type: 'input',
        disabled: false,
        required: true,
      },
      {
        field: 'NumeroContrato',
        header: 'Nº de contrato',
        type: 'input',
        disabled: false,
        required: true,
      },
      {
        field: 'Kmmaximos',
        header: 'Kms máximos',
        type: 'input',
        disabled: false,
        required: true,
      },
      {
        field: 'Cuotamensual',
        header: 'Cuota mensual',
        type: 'input',
        disabled: false,
        required: true,
      },
      {
        field: 'Activo',
        header: 'Estado',
        type: 'checkbox',
        disabled: false,
        required: true,
      },
      {
        field: 'Observaciones',
        header: 'Observaciones',
        type: 'textarea',
        disabled: false,
        required: false,
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
        header: 'Id vehículo',
        type: 'select',
        disabled: false,
        required: false,
        options: this.vehicleIds,
      },
    ];
  }

  showDriverDetails(rowData: Driver): void {
    this.apiService.selectedDriver = rowData;
    this.displayDriverDetails = true;
  }

  showEditDriver(rowData: Driver): void {
    this.displayEditDriver = true;
    this.formDriverGroup.patchValue(rowData);
  }

  showVehicleDetails(rowData: Vehicle): void {
    this.apiService.selectedVehicle = rowData;
    this.displayVehicleDetails = true;
  }

  showEditVehicle(rowData: Vehicle): void {
    this.displayEditVehicle = true;
    this.formVehicleGroup.patchValue(rowData);
  }

  saveDriver(isNew: boolean = false): void {
    if (this.formDriverGroup.invalid) {
      this.displayMessage('error', 'Revise el formulario');
    } else {
      let driver = new Driver();
      driver = this.formDriverGroup.value;
      // TODO: Call this.apiService.saveDriver(driver).subscribe(()=>{this.displayEditDriver = false;this.displayMessage('success', 'Conductor guardado correctamente');});
      isNew
        ? (this.displayAddDriver = false)
        : (this.displayEditDriver = false);
      this.displayMessage('success', 'Conductor guardado correctamente');
    }
  }

  saveVehicle(isNew: boolean = false): void {
    if (this.formVehicleGroup.invalid) {
      this.displayMessage('error', 'Revise el formulario');
    } else {
      let vehicle = new Vehicle(this.formVehicleGroup.value);
      vehicle = this.formVehicleGroup.value;
      // TODO: Call this.apiService.saveVehicle(vehicle).subscribe(()=>{this.displayEditVehicle = false;this.displayMessage('success', 'Vehículo guardado correctamente');});
      isNew
        ? (this.displayAddVehicle = false)
        : (this.displayEditVehicle = false);
      this.displayMessage('success', 'Vehículo guardado correctamente');
    }
  }

  removeDriver(rowData: Driver): void {
    if (rowData.idVehiculo) {
      this.displayMessage(
        'error',
        'Este conductor tiene vehiculo asignado y no se ha podido eliminar'
      );
    } else {
      // TODO: Call this.apiService.deleteDriver(rowData).subscribe(()=>{this.displayMessage('success', 'Conductor eliminado correctamente');});
    }
  }

  removeVehicle(rowData: Vehicle): void {
    if (rowData.id) {
      this.displayMessage(
        'error',
        'Este vehiculo tiene conductor asignado y no se ha podido eliminar'
      );
    } else {
      // TODO: Call this.apiService.deleteVehicle(vehicle).subscribe(()=>{this.displayMessage('success', 'Vehículo eliminado correctamente');});
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

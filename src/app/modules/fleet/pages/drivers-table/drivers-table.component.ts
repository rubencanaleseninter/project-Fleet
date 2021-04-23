import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { Driver } from '../../models/driver.model';
import { DriverApiService } from '../../services/driver-api.service';
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
  templateUrl: './drivers-table.component.html',
  styleUrls: ['./drivers-table.component.scss'],
})
export class DriversTableComponent implements OnInit {
  driverArray!: Driver[];
  driverCols!: any[];
  driverFilters!: string[];
  displayDriverDetails = false;
  displayFormDriverModal = false;
  formDriverGroup = new FormGroup({});

  constructor(
    public vehicleService: VehicleApiService,
    public driverService: DriverApiService,
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
    const drivers$ = this.driverService.getAllDrivers();
    const vehicleIds$ = this.vehicleService.getVehicleIds();

    forkJoin([drivers$, vehicleIds$]).subscribe(([drivers, vehicleIds]) => {
      this.driverArray = drivers;
      this.createDriverColumns(vehicleIds);
      this.createDriverFilters();
      this.createDriverForm();
    });
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

  createDriverColumns(vehicleIds: any[]): void {
    this.driverCols = [
      {
        field: 'employeeId',
        header: 'Código empleado/a',
        type: 'input',
        disabled: true,
        required: false,
      },
      {
        field: 'employeeName',
        header: 'Nombre',
        type: 'input',
        disabled: false,
        required: true,
      },
      {
        field: 'vehicleId',
        header: 'Vehículo asignado',
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
   * Display driver detail modal
   * @param rowData Driver
   */
  showDriverDetails(rowData: Driver): void {
    this.driverService.getDriver(rowData.employeeId).subscribe((res) => {
      this.driverService.selectedDriver = res;
      this.displayDriverDetails = true;
    });
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
      // FIXME: Call this.driverService.saveDriver(driver).subscribe(()=>{this.displayEditDriver = false;this.displayMessage('success', 'Conductor guardado correctamente');});
      this.displayFormDriverModal = false;
      this.displayMessage('success', 'Conductor guardado correctamente');
    }
  }

  /**
   * Remove the selected driver
   * @param rowData Driver
   */
  removeDriver(rowData: Driver): void {
    if (rowData.vehicleId.length > 0) {
      this.displayMessage(
        'error',
        'Este conductor tiene vehiculo asignado y no se puede eliminar'
      );
    } else {
      // FIXME: Call this.driverService.deleteDriver(rowData.id).subscribe(()=>{this.displayMessage('success', 'Conductor eliminado correctamente');});
    }
  }
}

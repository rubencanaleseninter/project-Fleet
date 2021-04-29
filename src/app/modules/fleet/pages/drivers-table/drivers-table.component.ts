import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { Columns } from '../../interfaces/columns';
import { Driver } from '../../models/driver.model';
import { DriverApiService } from '../../services/driver-api.service';
import { VehicleApiService } from '../../services/vehicle-api.service';

@Component({
  templateUrl: './drivers-table.component.html',
  styleUrls: ['./drivers-table.component.scss'],
})
export class DriversTableComponent implements OnInit {
  driverArray!: Driver[];
  cols!: Columns[];
  filters!: string[];
  displayDetails = false;
  displayForm = false;
  formGroup = new FormGroup({});

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
      this.createColumns(vehicleIds);
      this.createFilters();
      this.createForm();
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
  createForm(): void {
    this.formGroup = new FormGroup({});
    this.cols.forEach((col) =>
      this.formGroup.addControl(
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

  createColumns(vehicleIds: any[]): void {
    this.cols = [
      {
        field: 'employeeId',
        header: 'Código de empleado',
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
  createFilters(): void {
    this.filters = this.cols.map((col) => col.field);
  }

  /**
   * Display driver detail modal
   * @param rowData Driver
   */
  showDriverDetails(rowData: Driver): void {
    this.driverService.getDriver(rowData.employeeId).subscribe((res) => {
      this.driverService.selectedDriver = res;
      this.displayDetails = true;
    });
  }

  /**
   * Display add driver modal
   */
  showAddDriver(): void {
    if (this.formGroup.controls.employeeId.disabled) {
      this.formGroup.controls.employeeId.enable();
    }
    this.formGroup.reset();
    this.displayForm = true;
  }

  /**
   * Display edit driver modal
   * @param rowData Driver
   */
  showEditDriver(rowData: Driver): void {
    this.displayForm = true;
    this.formGroup.patchValue(rowData);
    if (this.formGroup.controls.employeeId.enabled) {
      this.formGroup.controls.employeeId.disable();
    }
  }

  /**
   * Save the driver form on edit or create new
   */
  saveDriver(): void {
    if (this.formGroup.invalid) {
      this.displayMessage('error', 'Revise el formulario');
    } else {
      let driver = new Driver();
      driver = this.formGroup.value;
      // FIXME: Call this.driverService.saveDriver(driver).subscribe(()=>{this.displayEditDriver = false;this.displayMessage('success', 'Conductor guardado correctamente');});
      this.displayForm = false;
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

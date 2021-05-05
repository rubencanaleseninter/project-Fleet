import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { Driver } from 'src/app/modules/fleet/models/driver.model';
import { DriverApiService } from 'src/app/modules/fleet/services/driver-api.service';
import { VehicleService } from 'src/app/modules/fleet/services/vehicle.service';

@Component({
  templateUrl: './drivers-form-dialog.component.html',
  styleUrls: ['./drivers-form-dialog.component.scss'],
})
export class DriversFormDialogComponent implements OnInit {
  driverOptions$!: Observable<Driver[]>;
  driverForm = new FormGroup({});
  constructor(
    private confirmationService: ConfirmationService,
    private vehicleService: VehicleService,
    private driverApiService: DriverApiService,
    private messageService: MessageService,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.driverOptions$ = this.driverApiService.getAllDrivers();
    this.createForm();
  }

  createForm(): void {
    this.driverForm = new FormGroup({
      selectDriver: new FormControl({ value: undefined }, Validators.required),
    });

    if (this.vehicleService.selectedVehicle.drivers) {
      this.driverForm.controls.selectDriver.setValue(
        this.vehicleService.selectedVehicle.drivers.find(
          (d: { active: any }) => d.active
        )?.employeeId
      );
    }
  }

  /**
   * Assign the driver to the selected vehicle
   */
  assignDriver(ev: any): void {
    this.confirmationService.confirm({
      target: ev.target,
      message:
        '¿Estás seguro de que deseas asignar a este conductor?, si tuviera otro vehículo se le asignará el último',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let driver = new Driver();
        driver = this.driverForm.value;
        // FIXME: Call this.driverService.assignDriver(driver).subscribe(()=>{this.displayEditDriver = false;this.displayMessage('success', 'Conductor guardado correctamente');});
        this.ref.close();
        this.displayMessage('success', 'Conductor asignado correctamente');
      },
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
}

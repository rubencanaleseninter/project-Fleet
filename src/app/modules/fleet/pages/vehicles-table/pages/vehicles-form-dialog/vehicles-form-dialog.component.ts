import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { Columns } from 'src/app/modules/fleet/interfaces/columns';
import { Driver } from 'src/app/modules/fleet/models/driver.model';
import { Vehicle } from 'src/app/modules/fleet/models/fleet.model';
import { DriverApiService } from 'src/app/modules/fleet/services/driver-api.service';
import { VehicleApiService } from 'src/app/modules/fleet/services/vehicle-api.service';
import { VehicleService } from 'src/app/modules/fleet/services/vehicle.service';

@Component({
  templateUrl: './vehicles-form-dialog.component.html',
  styleUrls: ['./vehicles-form-dialog.component.scss'],
})
export class VehiclesFormDialogComponent implements OnInit {
  driverOptions$!: Observable<Driver[]>;
  form!: FormGroup;
  fields!: Columns[];
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    public ref: DynamicDialogRef,
    public vehicleService: VehicleService,
    public vehicleApiService: VehicleApiService,
    public driverApiService: DriverApiService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.driverOptions$ = this.driverApiService.getAllDrivers();
    this.fields = this.vehicleService.fields;
    this.createForm();
  }

  createForm(): void {
    this.form = new FormGroup({});
    this.fields.forEach((f) => {
      this.form.addControl(
        f.field,
        this.fb.control(
          { value: f.value, disabled: f.disabled },
          f.required ? Validators.required : undefined
        )
      );
    });
    this.setFormValues();
  }

  setFormValues(): void {
    if (this.vehicleService.selectedVehicle.plate) {
      this.vehicleApiService
        .getVehicleDto(this.vehicleService.selectedVehicle.plate)
        .subscribe((res) => {
          this.form.patchValue(res);
          this.disableNoEditableControls();
        });
    }
  }

  disableNoEditableControls(): void {
    this.form.controls.plate.disable();
    this.form.controls.carframe.disable();
    this.form.controls.manufacturerId.disable();
    this.form.controls.modelId.disable();
    this.form.controls.financingTypeId.disable();
    this.form.controls.entryDate.disable();
    this.form.controls.assignedAtCompanyId.disable();
    this.form.controls.employeeId.disable();
    this.form.controls.vehicleTypeId.disable();
    this.form.controls.fuelTypeId.disable();
    this.form.controls.transmissionTypeId.disable();
    this.form.controls.financialCompanyId.disable();
    this.form.controls.contractNumber.disable();
    this.form.controls.maxMileage.disable();
  }

  /**
   * Save the vehicle form on edit or create new
   */
  saveVehicle(): void {
    if (this.form.invalid) {
      this.displayMessage('error', 'Revise el formulario');
    } else {
      let vehicle = Object.assign(this.form.value, new Vehicle());
      vehicle = this.form.value;
      // FIXME: Call this.vehicleApiService.saveVehicle(vehicle).subscribe(()=>{this.displayMessage('success', 'Vehículo guardado correctamente');});
      this.ref.close(true);
      this.displayMessage('success', 'Vehículo guardado correctamente');
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

import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Driver } from '../../models/driver.model';
import { DriverApiService } from '../../services/driver-api.service';
import { DriverService } from '../../services/driver.service';
import { VehicleApiService } from '../../services/vehicle-api.service';
import { VehicleService } from '../../services/vehicle.service';
import { DriversDetailDialogComponent } from './pages/drivers-detail-dialog/drivers-detail-dialog.component';

@Component({
  selector: 'app-drivers-table',
  templateUrl: './drivers-table.component.html',
  styleUrls: ['./drivers-table.component.scss'],
})
export class DriversTableComponent {
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public vehicleService: VehicleService,
    public vehicleApiService: VehicleApiService,
    public driverService: DriverService,
    public driverApiService: DriverApiService,
    public dialogService: DialogService
  ) {}

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
   * Display driver detail modal
   * @param rowData Driver
   */
  showDriverDetails(rowData: Driver): void {
    this.driverApiService.getDriver(rowData.employeeId).subscribe((res) => {
      this.driverService.setSelectedDriver(res);
      const ref = this.dialogService.open(DriversDetailDialogComponent, {
        header: 'Información',
        width: '50%',
      });
    });
  }

  /**
   * Remove the selected driver
   * @param rowData Driver
   */
  removeDriver(rowData: Driver, ev: any): void {
    this.confirmationService.confirm({
      target: ev.target,
      message:
        '¿Estás seguro de que deseas quitar al conductor de este vehículo?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // FIXME: Call this.driverApiService.deleteDriver(rowData.employeeId).subscribe(()=>{this.displayMessage('success', 'Conductor eliminado correctamente');});
        this.driverService.setDriversOfSelectedVehicle(
          this.vehicleService.selectedVehicle.drivers
        );
        this.displayMessage('success', 'Conductor eliminado correctamente');
      },
    });
  }
}

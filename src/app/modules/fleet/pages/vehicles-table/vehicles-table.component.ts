import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { Columns } from '../../interfaces/columns';
import { VehicleDto } from '../../interfaces/fleet.interface';
import { Vehicle } from '../../models/fleet.model';
import { DriverService } from '../../services/driver.service';
import { VehicleApiService } from '../../services/vehicle-api.service';
import { VehicleService } from '../../services/vehicle.service';
import { DriversFormDialogComponent } from '../drivers-table/pages/drivers-form-dialog/drivers-form-dialog.component';
import { VehiclesDetailDialogComponent } from './pages/vehicles-detail-dialog/vehicles-detail-dialog.component';
import { VehiclesFormDialogComponent } from './pages/vehicles-form-dialog/vehicles-form-dialog.component';

@Component({
  templateUrl: './vehicles-table.component.html',
  styleUrls: ['./vehicles-table.component.scss'],
})
export class VehiclesTableComponent implements OnInit {
  vehicles$!: Observable<Vehicle[]>;
  vehicles!: Vehicle[];
  filters!: string[];

  private _selectedCols!: Columns[];

  @Input() get selectedCols(): any[] {
    return this._selectedCols;
  }

  set selectedCols(val: any[]) {
    this._selectedCols = this.vehicleService.cols.filter((col) =>
      val.includes(col)
    );
  }

  constructor(
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    public vehicleService: VehicleService,
    public vehicleApiService: VehicleApiService,
    public driverService: DriverService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  /**
   * Get the vehicles subscription data
   */
  getData(): void {
    this.vehicles$ = this.vehicleApiService.getAllVehicles();
    this._selectedCols = this.vehicleService.cols;
    this.filters = this.selectedCols.map((col) => col.field);

    this.vehicles$.subscribe((res) => (this.vehicles = res));
  }

  /**
   * Display vehicle detail modal
   * @param rowData Vehicle
   */
  showVehicleDetails(rowData: Vehicle): void {
    this.vehicleApiService.getVehicle(rowData.plate).subscribe((res) => {
      this.vehicleService.setSelectedVehicle(res);
      const ref = this.dialogService.open(VehiclesDetailDialogComponent, {
        header: 'Información',
        width: '50%',
      });
    });
  }

  /**
   * Display edit or create vehicle modal
   * @param rowData Vehicle
   */
  showVehicleForm(tab: Table, rowData: Vehicle = new Vehicle()): void {
    tab.expandedRowKeys = {};
    this.vehicleService.setSelectedVehicle(rowData);
    const ref = this.dialogService.open(VehiclesFormDialogComponent, {
      header: 'Información',
      width: '50%',
    });
  }

  /**
   * Remove the selected vehicle
   * @param rowData Vehicle
   */
  removeVehicle(rowData: VehicleDto, ev: any): void {
    this.confirmationService.confirm({
      target: ev.target,
      message: '¿Estás seguro de que deseas anular este vehículo?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // FIXME: Call this.vehicleApiService.deleteVehicle(rowData.plate).subscribe(()=>{this.displayMessage('success', 'Vehículo eliminado correctamente');});
        this.vehicles = [...this.vehicles];
        this.displayMessage('success', 'Vehículo anulado correctamente');
      },
    });
  }

  onRowExpand(tab: Table, rowData: any): void {
    this.vehicleService.setSelectedVehicle(rowData);
    this.driverService.setDriversOfSelectedVehicle(rowData.drivers);
    tab.expandedRowKeys[rowData.rowId.rowId] = true;
  }

  /**
   * Display add driver modal
   */
  showAddDriver(rowData: Vehicle): void {
    this.vehicleService.setSelectedVehicle(rowData);
    const ref = this.dialogService.open(DriversFormDialogComponent, {
      header: 'Información',
      width: '50%',
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

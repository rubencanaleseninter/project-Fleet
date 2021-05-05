import { Component } from '@angular/core';
import { VehicleService } from 'src/app/modules/fleet/services/vehicle.service';

@Component({
  templateUrl: './vehicles-detail-dialog.component.html',
  styleUrls: ['./vehicles-detail-dialog.component.scss'],
})
export class VehiclesDetailDialogComponent {
  constructor(public vehicleService: VehicleService) {}
}

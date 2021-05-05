import { Component } from '@angular/core';
import { DriverService } from 'src/app/modules/fleet/services/driver.service';

@Component({
  templateUrl: './drivers-detail-dialog.component.html',
  styleUrls: ['./drivers-detail-dialog.component.scss'],
})
export class DriversDetailDialogComponent {
  constructor(public driverService: DriverService) {}
}

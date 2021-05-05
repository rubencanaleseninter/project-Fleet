import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Columns } from '../interfaces/columns';
import { Driver } from '../models/driver.model';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  selectedDriver$ = new Subject<Driver>();
  selectedDriver!: any;
  drivers$ = new Subject<Driver[]>();
  drivers!: any[];
  calendar = {
    es: {
      firstDayOfWeek: 1,
      dayNames: [
        'domingo',
        'lunes',
        'martes',
        'miércoles',
        'jueves',
        'viernes',
        'sábado',
      ],
      dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      monthNames: [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre',
      ],
      monthNamesShort: [
        'ene',
        'feb',
        'mar',
        'abr',
        'may',
        'jun',
        'jul',
        'ago',
        'sep',
        'oct',
        'nov',
        'dic',
      ],
      today: 'Hoy',
      clear: 'Borrar',
    },
    today: new Date(),
  };

  cols: Columns[] = [
    {
      field: 'active',
      header: 'Conductor',
      width: '80px',
      type: 'active',
    },
    {
      field: 'employeeId',
      header: 'Código de empleado',
      width: '100px',
    },
    {
      field: 'employeeName',
      header: 'Nombre',
      width: '200px',
    },
    {
      field: 'delegation',
      header: 'Delegación',
      width: '120px',
    },
    {
      field: 'startDate',
      header: 'Fecha de inicio',
      width: '100px',
      type: 'date',
    },
    {
      field: 'endDate',
      header: 'Fecha de fin',
      width: '100px',
      type: 'date',
    },
  ];

  /**
   * Observable selected driver
   */
  getSelectedDriver(): Observable<Driver> {
    return this.selectedDriver$.asObservable();
  }

  /**
   * Set selected driver
   */
  setSelectedDriver(driver: Driver): void {
    this.selectedDriver = driver;
    this.selectedDriver$.next(driver);
  }

  /**
   * Observable drivers of selected vehicle
   */
  getDriversOfSelectedVehicle(): Observable<Driver[]> {
    return this.drivers$.asObservable();
  }

  /**
   * Set drivers of selected vehicle
   */
  setDriversOfSelectedVehicle(drivers: Driver[]): void {
    this.drivers = drivers;
    this.drivers$.next(drivers);
  }
}

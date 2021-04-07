import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, throwError } from 'rxjs';
import { Driver } from '../models/driver.model';
import { Vehicle } from '../models/fleet.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // PATHS
  private GATEWAY = 'gateway';
  private API = '/fleet';
  private ALL_DRIVERS = '/all-drivers';
  private ALL_VEHICLES = '/all-vehicles';
  private DRIVER = '/driver';
  private VEHICLE = '/vehicle';
  // DATA
  selectedVehicle$ = new Subject<Vehicle>();
  selectedVehicle: any;
  selectedDriver$ = new Subject<Driver>();
  selectedDriver: any;
  // CALENDAR OPTIONS
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

  constructor(private http: HttpClient) {}

  /* ===== OBSERVABLES ===== */

  /**
   * Observable selected vehicle
   */
  getSelectedVehicle(): Observable<Vehicle> {
    return this.selectedVehicle$.asObservable();
  }

  /**
   * Set selected vehicle
   */
  SetSelectedVehicle(vehicle: Vehicle): void {
    this.selectedVehicle = vehicle;
    this.selectedVehicle$.next(vehicle);
  }

  /**
   * Observable selected driver
   */
  getSelectedDriver(): Observable<Driver> {
    return this.selectedDriver$.asObservable();
  }

  /**
   * Set selected driver
   */
  SetSelectedDriver(driver: Driver): void {
    this.selectedDriver = driver;
    this.selectedDriver$.next(driver);
  }

  /* ===== API CALLS ===== */

  /**
   * Get vehicles list
   */
  getAllVehicles(): Observable<Vehicle[]> {
    /** API CALL BE */
    // return this.http
    //   .get<Vehicle[]>(this.GATEWAY + this.API + this.ALL_VEHICLES)
    //   .pipe(catchError((err) => throwError(err)));

    /** LOCAL JSON */
    // FIXME: Remove fake calls
    return this.http
      .get<Vehicle[]>('/assets/vehicles.json')
      .pipe(catchError((err) => throwError(err)));
  }

  /**
   * Get drivers list
   */
  getAllDrivers(): Observable<Driver[]> {
    /** API CALL BE */
    // return this.http
    //   .get<Driver[]>(this.GATEWAY + this.API + this.ALL_DRIVERS)
    //   .pipe(catchError((err) => throwError(err)));

    /** LOCAL JSON */
    // FIXME: Remove fake calls
    return this.http
      .get<Driver[]>('/assets/drivers.json')
      .pipe(catchError((err) => throwError(err)));
  }

  /**
   * Get a specific vehicle
   * @param id vehicle code
   */
  getVehicle(id: number): Observable<Vehicle> {
    return this.http
      .post<Vehicle>(this.GATEWAY + this.API + this.VEHICLE, id)
      .pipe(catchError((err) => throwError(err)));
  }

  /**
   * Get a specific driver
   * @param id codeEmployee
   */
  getDriver(id: number): Observable<Driver> {
    return this.http
      .post<Driver>(this.GATEWAY + this.API + this.DRIVER, id)
      .pipe(catchError((err) => throwError(err)));
  }

  /**
   * Save a new or edited vehicle
   * @param vehicle Vehicle
   */
  saveVehicle(vehicle: Vehicle): Observable<any> {
    return this.http
      .post<Vehicle>(this.GATEWAY + this.API + this.DRIVER, vehicle)

      .pipe(catchError((err) => throwError(err)));
  }

  /**
   * Save a new or edited driver
   * @param driver Driver
   */
  saveDriver(driver: Driver): Observable<any> {
    return this.http
      .post<Driver>(this.GATEWAY + this.API + this.DRIVER, driver)
      .pipe(catchError((err) => throwError(err)));
  }

  /**
   * Delete the selected vehicle
   * @param id string
   */
  deleteVehicle(id: string): Observable<any> {
    return this.http
      .post<string>(this.GATEWAY + this.API + this.DRIVER, id)
      .pipe(catchError((err) => throwError(err)));
  }

  /**
   * Delete the selected driver
   * @param id string
   */
  deleteDriver(id: string): Observable<any> {
    return this.http
      .post<string>(this.GATEWAY + this.API + this.DRIVER, id)
      .pipe(catchError((err) => throwError(err)));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, of, throwError } from 'rxjs';
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
  // MOCK
  vehicles: Vehicle[] = [
    new Vehicle(
      1,
      '99999GXW',
      'fsfdsfdsfdsfds',
      3,
      1,
      '',
      1,
      0,
      2,
      2,
      1,
      123123,
      8000,
      1250,
      1,
      'Al coche fantástico no le funciona el Aire'
    ),
    new Vehicle(
      2,
      '12345HFM',
      'asd-asd-asd',
      3,
      1,
      '',
      1,
      0,
      2,
      2,
      1,
      8567,
      8000,
      970,
      0,
      'Cuidado con el asiento de piel'
    ),
  ];

  drivers: Driver[] = [new Driver(1, 'Antonio', 1), new Driver(2, 'Manolo', 2)];

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

    /** LOCAL MOCK */
    // return of(this.vehicles).pipe(catchError((err) => throwError(err)));

    /** LOCAL JSON */
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

    /** LOCAL MOCK */
    // return of(this.drivers).pipe(catchError((err) => throwError(err)));

    /** LOCAL JSON */
    return this.http
      .get<Driver[]>('/assets/drivers.json')
      .pipe(catchError((err) => throwError(err)));
  }

  /**
   * Get a specific vehicle
   * @param id vehicle code
   */
  getVehicle(id: number): Observable<any> {
    // return this.http
    //   .post<Vehicle[]>(this.GATEWAY + this.API + this.VEHICLE, id)
    //   .pipe(catchError((err) => throwError(err)));
    const selectedVehicle = this.vehicles.find((vh) => vh.id === id);
    const vehicle = of(selectedVehicle ? selectedVehicle : {});
    return vehicle;
  }

  /**
   * Get a specific driver
   * @param id codeEmployee
   */
  getDriver(id: number): Observable<any> {
    // return this.http
    //   .post<Driver[]>(this.GATEWAY + this.API + this.DRIVER, id)
    //   .pipe(catchError((err) => throwError(err)));
    const driver = of(this.drivers.find((dr) => dr.codigoEmpleado === id));
    return driver;
  }
}

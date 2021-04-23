import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Driver } from '../models/driver.model';

@Injectable({
  providedIn: 'root',
})
export class DriverApiService {
  private GATEWAY = 'gateway';
  private API = '/fleet';
  private ALL_DRIVERS = '/all-drivers';
  private DRIVER = '/driver';

  selectedDriver$ = new Subject<Driver>();
  selectedDriver: any;
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
   * Get a specific driver
   * @param id codeEmployee
   */
  getDriver(id: number): Observable<Driver> {
    // return this.http
    //   .post<Driver>(this.GATEWAY + this.API + this.DRIVER, id)
    //   .pipe(catchError((err) => throwError(err)));
    return of(
      Object.assign(
        {
          employeeId: 1,
          employeeName: 'Antonio',
          vehicleId: ['5964FVY'],
        },
        new Driver()
      )
    );
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
   * Delete the selected driver
   * @param id string
   */
  deleteDriver(id: string): Observable<any> {
    return this.http
      .post<string>(this.GATEWAY + this.API + this.DRIVER, id)
      .pipe(catchError((err) => throwError(err)));
  }
}

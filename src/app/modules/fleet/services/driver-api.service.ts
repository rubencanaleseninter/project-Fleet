import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
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

  constructor(private http: HttpClient) {}

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
          active: true,
          employeeId: 1,
          employeeName: 'Antonio',
          vehicleId: '5964FVY',
          delegation: 'Eninter - Central',
          startDate: new Date('01/04/2021'),
          status: 'Disponible',
          history: [
            {
              vehicle: '5964FVY - Ford Fiesta',
              startDate: '01/04/2021 08:30',
              endDate: '',
            },
            {
              vehicle: '3834LKM - Volkswagen Polo',
              startDate: '01/01/2021 14:00',
              endDate: '30/03/2021 17:30',
            },
            {
              vehicle: '9127HSD - Yamaha Tricity',
              startDate: '15/10/2020 16:15',
              endDate: '30/10/2020 10:30',
            },
          ],
        },
        new Driver()
      )
    );
  }

  /**
   * Assign vehicle driver
   * @param driver Driver
   */
  assignDriver(driver: Driver): Observable<any> {
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

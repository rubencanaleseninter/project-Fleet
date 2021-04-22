import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, throwError, of } from 'rxjs';
import { Driver } from '../models/driver.model';
import { Vehicle } from '../models/fleet.model';
import { catchError, map } from 'rxjs/operators';

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
  private FINANCING_TYPES = '/financing_types';
  private COMBUSTIBLE_TYPES = '/combustible_types';
  private VEHICLE_TYPES = '/vehicle_types';
  private VEHICLE_MODELS = '/vehicle_models';
  private FINANCING_COMPANIES = '/financing_companies';
  private MANUFACTURERS = '/manufacturers';
  private TRANSMISSION_TYPES = '/transmission_types';
  private ENVIRONMENT_LABEL_TYPES = '/environment_label_types';
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
   * Get vehicle ids
   */
  getVehicleIds(): Observable<Vehicle[]> {
    return this.http.get<any[]>('/assets/vehicles.json').pipe(
      map((res: any[]) => {
        const vehicleIds: any[] = [];
        res.forEach((vh: Vehicle) => {
          vehicleIds.push({
            name: vh.plate.toString(),
            value: vh.plate,
          });
        });
        return vehicleIds;
      }),
      catchError((err) => throwError(err))
    );
  }

  /**
   * Get vehicle financing options
   */
  getFinancingTypes(): Observable<any[]> {
    // return this.http
    //   .get<any[]>(this.GATEWAY + this.API + this.FINANCING_TYPES)
    //   .pipe(catchError((err) => throwError(err)));
    return of([
      { name: 'Sin asignar', value: 0 },
      { name: 'Renting - 48 Meses', value: 1 },
    ]);
  }

  /**
   * Get vehicle financing companies
   */
  getFinancingCompanies(): Observable<any[]> {
    // return this.http
    //   .get<any[]>(this.GATEWAY + this.API + this.FINANCING_COMPANIES)
    //   .pipe(catchError((err) => throwError(err)));
    return of([
      { name: 'Sin asignar', value: 0 },
      { name: 'Alphabet', value: 1 },
      { name: 'Cooltra Motos SLU', value: 2 },
    ]);
  }

  /**
   * Get vehicle options
   */
  getVehicleTypes(): Observable<any[]> {
    // return this.http
    //   .get<any[]>(this.GATEWAY + this.API + this.VEHICLE_TYPES)
    //   .pipe(catchError((err) => throwError(err)));
    return of([
      { name: 'Sin asignar', value: 0 },
      { name: 'Turismo', value: 1 },
      { name: 'Motocicleta', value: 2 },
      { name: 'Furgoneta', value: 3 },
      { name: 'Vehículo 3 ruedas', value: 4 },
    ]);
  }

  /**
   * Get vehicle models
   */
  getVehicleModels(): Observable<any[]> {
    // return this.http
    //   .get<any[]>(this.GATEWAY + this.API + this.VEHICLE_MODELS)
    //   .pipe(catchError((err) => throwError(err)));
    return of([
      { name: 'Sin asignar', value: 0 },
      { name: 'Golf', value: 1 },
      { name: 'Polo', value: 2 },
      { name: 'Kangoo', value: 3 },
      { name: 'Tricity 125 ABS', value: 4 },
    ]);
  }

  /**
   * Get vehicle combustible options
   */
  getCombustibleTypes(): Observable<any[]> {
    // return this.http
    //   .get<any[]>(this.GATEWAY + this.API + this.COMBUSTIBLE_TYPES)
    //   .pipe(catchError((err) => throwError(err)));
    return of([
      { name: 'Sin asignar', value: 0 },
      { name: 'Gasolina', value: 1 },
      { name: 'Diesel', value: 2 },
      { name: 'Híbrido', value: 3 },
      { name: 'Eléctrico', value: 4 },
    ]);
  }

  /**
   * Get vehicle manufacturers
   */
  getManufacturers(): Observable<any[]> {
    // return this.http
    //   .get<any[]>(this.GATEWAY + this.API + this.MANUFACTURERS)
    //   .pipe(catchError((err) => throwError(err)));
    return of([
      { name: 'Sin asignar', value: 0 },
      { name: 'Volkswagen', value: 1 },
      { name: 'Renault', value: 2 },
      { name: 'Yamaha', value: 3 },
    ]);
  }

  /**
   * Get vehicle transmission options
   */
  getTransmissionTypes(): Observable<any[]> {
    // return this.http
    //   .get<any[]>(this.GATEWAY + this.API + this.TRANSMISSION_TYPES)
    //   .pipe(catchError((err) => throwError(err)));
    return of([
      { name: 'Sin asignar', value: 0 },
      { name: 'Manual', value: 1 },
      { name: 'Automática', value: 2 },
    ]);
  }

  /**
   * Get vehicle transmission options
   */
  getEnvironmentLabelTypes(): Observable<any[]> {
    // return this.http
    //   .get<any[]>(this.GATEWAY + this.API + this.ENVIRONMENT_LABEL_TYPES)
    //   .pipe(catchError((err) => throwError(err)));
    return of([
      { name: 'Sin asignar', value: 0 },
      { name: 'ZERO', value: 1 },
      { name: 'ECO', value: 2 },
      { name: 'B', value: 3 },
      { name: 'C', value: 4 },
      { name: 'D', value: 5 },
    ]);
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

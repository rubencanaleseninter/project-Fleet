import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, throwError, of } from 'rxjs';
import { Vehicle } from '../models/fleet.model';
import { catchError, map } from 'rxjs/operators';
import { VehicleDto } from '../interfaces/fleet.interface';

@Injectable({
  providedIn: 'root',
})
export class VehicleApiService {
  private GATEWAY = 'gateway';
  private API = '/fleet';
  private ALL_VEHICLES = '/all-vehicles';
  private VEHICLE = '/vehicle';
  private FINANCING_TYPES = '/financing_types';
  private COMBUSTIBLE_TYPES = '/combustible_types';
  private VEHICLE_TYPES = '/vehicle_types';
  private VEHICLE_MODELS = '/vehicle_models';
  private FINANCING_COMPANIES = '/financing_companies';
  private MANUFACTURERS = '/manufacturers';
  private TRANSMISSION_TYPES = '/transmission_types';
  private ENVIRONMENT_LABEL_TYPES = '/environment_label_types';

  selectedVehicle$ = new Subject<Vehicle>();
  selectedVehicle: any;
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
   * Get a specific vehicle
   * @param id vehicle code
   */
  getVehicle(id: number): Observable<VehicleDto> {
    // return this.http
    //   .post<Vehicle>(this.GATEWAY + this.API + this.VEHICLE, id)
    //   .pipe(catchError((err) => throwError(err)));
    return of({
      rowId: 1,
      plate: '3145BCD',
      carframe: '0g896dh',
      modelId: 1,
      manufacturerId: 1,
      financingTypeId: 1,
      entryDate: new Date(),
      leaveDate: undefined,
      employeeId: 1,
      assignedAtCompanyId: 1,
      mileage: 5000,
      vehicleTypeId: 1,
      fuelTypeId: 1,
      pollutingEmissions: 150,
      transmissionTypeId: 1,
      financialCompanyId: 1,
      contractNumber: 8,
      maxMileage: 12000,
      monthlyFee: 1250,
      active: true,
      environmentLabelId: 1,
      fuelConsumption: undefined,
      observations: 'Al coche fantástico no le funciona el Aire',
    });
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
      .post<Vehicle>(this.GATEWAY + this.API + this.VEHICLE, vehicle)
      .pipe(catchError((err) => throwError(err)));
  }

  /**
   * Delete the selected vehicle
   * @param id string
   */
  deleteVehicle(id: string): Observable<any> {
    return this.http
      .post<string>(this.GATEWAY + this.API + this.VEHICLE, id)
      .pipe(catchError((err) => throwError(err)));
  }
}

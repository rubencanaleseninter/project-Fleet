import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { Columns } from '../interfaces/columns';
import { Vehicle } from '../models/fleet.model';
import { VehicleApiService } from './vehicle-api.service';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
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

  fields: Columns[] = [
    // {
    //   field: 'rowId',
    //   header: 'Id',
    //   type: 'input',
    //   disabled: true,
    //   required: false,
    // },
    {
      field: 'active',
      header: '',
      type: 'checkbox',
      required: true,
      value: true,
    },
    {
      field: 'plate',
      header: 'Matricula',
      type: 'input',
      placeholder: 'requerido',
      required: true,
    },
    {
      field: 'carframe',
      header: 'Bastidor',
      type: 'input',
      placeholder: 'requerido',
      required: true,
    },
    {
      field: 'manufacturerId',
      header: 'Marca',
      type: 'select',
      placeholder: 'requerido',
      required: true,
      options: this.vehicleApiService.getManufacturers(),
    },
    {
      field: 'modelId',
      header: 'Modelo',
      type: 'select',
      placeholder: 'requerido',
      required: true,
      options: this.vehicleApiService.getVehicleModels(),
    },
    {
      field: 'employeeId',
      header: 'Conductor',
      type: 'select',
      options: this.vehicleApiService.getEmployees(),
      optionLabel: 'employeeName',
      optionValue: 'employeeId',
    },
    {
      field: 'financingTypeId',
      header: 'Tipo de financiación',
      type: 'select',
      placeholder: 'requerido',
      required: true,
      options: this.vehicleApiService.getFinancingTypes(),
    },
    {
      field: 'entryDate',
      header: 'Fecha de alta',
      type: 'date',
      placeholder: 'Requerido',
    },
    {
      field: 'leavingDate',
      header: 'Fecha de baja',
      type: 'date',
    },
    {
      field: 'assignedAtCompanyId',
      header: 'Empresa',
      type: 'select',
      placeholder: 'requerido',
      required: true,
      options: this.vehicleApiService.getDelegations(),
    },
    {
      field: 'mileage',
      header: 'Kms actuales',
      type: 'input',
      placeholder: 'requerido',
      required: true,
    },
    {
      field: 'vehicleTypeId',
      header: 'Tipo de vehículo',
      type: 'select',
      placeholder: 'requerido',
      required: true,
      options: this.vehicleApiService.getVehicleTypes(),
    },
    {
      field: 'fuelTypeId',
      header: 'Tipo de combustible',
      type: 'select',
      placeholder: 'requerido',
      required: true,
      options: this.vehicleApiService.getCombustibleTypes(),
    },
    {
      field: 'pollutingEmissions',
      header: 'Emisiones',
      type: 'input',
      placeholder: 'g/km',
    },
    {
      field: 'transmissionTypeId',
      header: 'Tipo de transmisión',
      type: 'select',
      placeholder: 'requerido',
      required: true,
      options: this.vehicleApiService.getTransmissionTypes(),
    },
    {
      field: 'financialCompanyId',
      header: 'Id financiera',
      type: 'input',
      placeholder: 'requerido',
      required: true,
    },
    {
      field: 'contractNumber',
      header: 'Nº de contrato',
      type: 'input',
      placeholder: 'requerido',
      required: true,
    },
    {
      field: 'maxMileage',
      header: 'Kms máximos',
      type: 'input',
      placeholder: 'requerido',
      required: true,
    },
    {
      field: 'monthlyFee',
      header: 'Cuota mensual',
      type: 'input',
      placeholder: 'requerido',
      required: true,
    },
    {
      field: 'environmentLabelId',
      header: 'Etiqueta medioambiental',
      type: 'select',
      options: this.vehicleApiService.getEnvironmentLabelTypes(),
    },
    {
      field: 'fuelConsumption',
      header: 'Consumo',
      type: 'input',
      placeholder: 'l/100Km',
    },
    {
      field: 'observations',
      header: 'Observaciones',
      type: 'textarea',
    },
  ];

  cols = [
    // {
    //   field: 'rowId',
    //   header: 'Id',
    //   width: '80px',
    // },
    {
      field: 'plate',
      header: 'Matricula',
      width: '120px',
    },
    {
      field: 'carframe',
      header: 'Bastidor',
      width: '150px',
    },
    {
      field: 'manufacturerName',
      header: 'Marca',
      width: '120px',
    },
    {
      field: 'modelName',
      header: 'Modelo',
      width: '150px',
    },
    {
      field: 'financingTypeName',
      header: 'Financiación',
      width: '120px',
    },
    {
      field: 'entryDate',
      header: 'Fecha de alta',
      width: '150px',
      type: 'date',
    },
    {
      field: 'leavingDate',
      header: 'Fecha de baja',
      width: '160px',
      type: 'date',
    },
    {
      field: 'employeeName',
      header: 'Conductor',
      width: '180px',
    },
    {
      field: 'assignedAtCompanyName',
      header: 'Empresa',
      width: '150px',
    },
    {
      field: 'mileage',
      header: 'Kms actuales',
      width: '140px',
      placeholder: 'kms',
    },
    {
      field: 'vehicleTypeName',
      header: 'Tipo de vehículo',
      width: '140px',
    },
    {
      field: 'fuelTypeName',
      header: 'Combustible',
      width: '120px',
    },
    {
      field: 'pollutingEmissions',
      header: 'Emisiones',
      width: '120px',
      placeholder: 'g/km',
    },
    {
      field: 'transmissionTypeName',
      header: 'Transmisión',
      width: '120px',
    },
    {
      field: 'financialCompanyName',
      header: 'Financiera',
      width: '150px',
    },
    {
      field: 'contractNumber',
      header: 'Nº de contrato',
      width: '150px',
    },
    {
      field: 'maxMileage',
      header: 'Kms máximos',
      width: '120px',
      placeholder: 'kms',
    },
    {
      field: 'monthlyFee',
      header: 'Cuota mensual',
      width: '130px',
      placeholder: '€/mes',
    },
    {
      field: 'active',
      header: 'Estado',
      width: '120px',
      type: 'checkbox',
    },
    {
      field: 'environmentLabelName',
      header: 'Etiqueta med.',
      width: '140px',
    },
    {
      field: 'fuelConsumption',
      header: 'Consumo l/100km',
      width: '160px',
      placeholder: 'l/100km',
    },
    {
      field: 'observations',
      header: 'Observaciones',
      width: '200px',
    },
  ];

  constructor(
    private vehicleApiService: VehicleApiService,
    private messageService: MessageService
  ) {}

  /**
   * Observable selected vehicle
   */
  getSelectedVehicle(): Observable<Vehicle> {
    return this.selectedVehicle$.asObservable();
  }

  /**
   * Set selected vehicle
   */
  setSelectedVehicle(vehicle: Vehicle): void {
    this.selectedVehicle = vehicle;
    this.selectedVehicle$.next(vehicle);
  }
}

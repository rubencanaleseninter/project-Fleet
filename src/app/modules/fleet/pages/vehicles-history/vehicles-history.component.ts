import { Component, Input, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Columns } from '../../interfaces/columns';
import { Vehicle } from '../../models/fleet.model';
import { VehicleApiService } from '../../services/vehicle-api.service';

@Component({
  templateUrl: './vehicles-history.component.html',
  styleUrls: ['./vehicles-history.component.scss'],
})
export class VehiclesHistoryComponent implements OnInit {
  vehicleArray!: Vehicle[];
  cols!: Columns[];
  filters!: string[];
  selectedVehicle!: any;
  rangeDates!: Date[];
  minDate!: Date;
  maxDate!: Date;
  es!: any;
  invalidDates!: Array<Date>;
  displayDetails = false;
  private _selectedCols!: Columns[];

  @Input() get selectedCols(): any[] {
    return this._selectedCols;
  }

  set selectedCols(val: any[]) {
    this._selectedCols = this.cols.filter((col) => val.includes(col));
  }

  constructor(public vehicleService: VehicleApiService) {}

  ngOnInit(): void {
    this.getCalendarSetup();
    this.getData();
  }

  getCalendarSetup(): void {
    this.es = {
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
    };

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = prevMonth === 11 ? year - 1 : year;
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = nextMonth === 0 ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

    const invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [today, invalidDate];
  }

  /**
   * Get the vehicles list
   */
  getData(): void {
    const vehicles$ = this.vehicleService.getAllVehicles();
    forkJoin([vehicles$]).subscribe(([vehicles]) => {
      this.vehicleArray = vehicles;
      this.createColums();
      this.createFilters();
    });
  }

  /**
   * Create the columns of the tables
   */
  createColums(): void {
    this.cols = [
      // {
      //   field: 'rowId',
      //   header: 'Id',
      //   width: '80px',
      // },
      {
        field: 'plate',
        header: 'Matricula',
        width: '100px',
      },
      {
        field: 'carframe',
        header: 'Bastidor',
        width: '180px',
      },
      {
        field: 'manufacturerName',
        header: 'Marca',
        width: '120px',
      },
      {
        field: 'modelName',
        header: 'Modelo',
        width: '180px',
      },
      {
        field: 'financingTypeName',
        header: 'Tipo de financiación',
        width: '100px',
      },
      {
        field: 'entryDate',
        header: 'Fecha de alta',
        width: '120px',
      },
      {
        field: 'leavingDate',
        header: 'Fecha de baja',
        width: '120px',
      },
      {
        field: 'employeeName',
        header: 'Conductor',
        width: '100px',
      },
      {
        field: 'assignedAtCompanyName',
        header: 'Empresa',
        width: '120px',
      },
      {
        field: 'mileage',
        header: 'Kms actuales',
        width: '100px',
        placeholder: 'kms',
      },
      {
        field: 'vehicleTypeName',
        header: 'Tipo de vehículo',
        width: '100px',
      },
      {
        field: 'fuelTypeName',
        header: 'Tipo de combustible',
        width: '120px',
      },
      {
        field: 'pollutingEmissions',
        header: 'Emisiones',
        width: '100px',
        placeholder: 'g/km',
      },
      {
        field: 'transmissionTypeName',
        header: 'Tipo de transmisión',
        width: '100px',
      },
      {
        field: 'financialCompanyName',
        header: 'Financiera',
        width: '100px',
      },
      {
        field: 'contractNumber',
        header: 'Nº de contrato',
        width: '100px',
      },
      {
        field: 'maxMileage',
        header: 'Kms máximos',
        width: '100px',
        placeholder: 'kms',
      },
      {
        field: 'monthlyFee',
        header: 'Cuota mensual',
        width: '100px',
        placeholder: '€/mes',
      },
      {
        field: 'active',
        header: 'Estado',
        width: '100px',
      },
      {
        field: 'environmentLabelName',
        header: 'Etiqueta med.',
        width: '100px',
      },
      {
        field: 'fuelConsumption',
        header: 'Consumo l/100km',
        width: '100px',
        placeholder: 'l/100km',
      },
      {
        field: 'observations',
        header: 'Observaciones',
        width: '200px',
      },
    ];
    this._selectedCols = this.cols;
  }

  createFilters(): void {
    this.filters = this.selectedCols.map((col) => col.field);
  }

  /**
   * Display vehicle detail modal
   * @param rowData Vehicle
   */
  showDetails(rowData: Vehicle): void {
    this.selectedVehicle = rowData;
    this.displayDetails = true;
  }
}

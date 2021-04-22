export class Vehicle {
  private _rowId!: number;
  private _plate!: string;
  private _carframe!: string;
  private _manufacturerId!: number;
  private _modelId!: number;
  private _entryDate!: Date;
  private _leavingDate!: Date;
  private _employeeId!: number;
  private _assignedAtCompanyId!: number;
  private _mileage!: number;
  private _vehicleTypeId!: number;
  private _fuelTypeId!: number;
  private _pollutingEmissions!: number;
  private _transmissionTypeId!: number;
  private _financialCompanyId!: number;
  private _financingTypeId!: number;
  private _contractNumber!: number;
  private _maxMileage!: number;
  private _monthlyFee!: number;
  private _active = true;
  private _environmentLabelId!: number;
  private _fuelConsumption!: number;
  private _observations!: string;

  get rowId(): number {
    return this._rowId;
  }
  set rowId(value: number) {
    this._rowId = value;
  }

  get plate(): string {
    return this._plate;
  }
  set plate(value: string) {
    this._plate = value;
  }

  get carframe(): string {
    return this._carframe;
  }
  set carframe(value: string) {
    this._carframe = value;
  }

  get manufacturerId(): number {
    return this._manufacturerId;
  }
  set manufacturerId(value: number) {
    this._manufacturerId = value;
  }

  get modelId(): number {
    return this._modelId;
  }
  set modelId(value: number) {
    this._modelId = value;
  }

  get entryDate(): Date {
    return this._entryDate;
  }
  set entryDate(value: Date) {
    this._entryDate = value;
  }

  get leavingDate(): Date {
    return this._leavingDate;
  }
  set leavingDate(value: Date) {
    this._leavingDate = value;
  }

  get employeeId(): number {
    return this._employeeId;
  }
  set employeeId(value: number) {
    this._employeeId = value;
  }

  get assignedAtCompanyId(): number {
    return this._assignedAtCompanyId;
  }
  set assignedAtCompanyId(value: number) {
    this._assignedAtCompanyId = value;
  }

  get mileage(): number {
    return this._mileage;
  }
  set mileage(value: number) {
    this._mileage = value;
  }

  get vehicleTypeId(): number {
    return this._vehicleTypeId;
  }
  set vehicleTypeId(value: number) {
    this._vehicleTypeId = value;
  }

  get fuelTypeId(): number {
    return this._fuelTypeId;
  }
  set fuelTypeId(value: number) {
    this._fuelTypeId = value;
  }

  get pollutingEmissions(): number {
    return this._pollutingEmissions;
  }
  set pollutingEmissions(value: number) {
    this._pollutingEmissions = value;
  }

  get transmissionTypeId(): number {
    return this._transmissionTypeId;
  }
  set transmissionTypeId(value: number) {
    this._transmissionTypeId = value;
  }

  get financialCompanyId(): number {
    return this._financialCompanyId;
  }
  set financialCompanyId(value: number) {
    this._financialCompanyId = value;
  }

  get financingTypeId(): number {
    return this._financingTypeId;
  }
  set financingTypeId(value: number) {
    this._financingTypeId = value;
  }

  get contractNumber(): number {
    return this._contractNumber;
  }
  set contractNumber(value: number) {
    this._contractNumber = value;
  }

  get maxMileage(): number {
    return this._maxMileage;
  }
  set maxMileage(value: number) {
    this._maxMileage = value;
  }

  get monthlyFee(): number {
    return this._monthlyFee;
  }
  set monthlyFee(value: number) {
    this._monthlyFee = value;
  }

  get active(): boolean {
    return this._active;
  }
  set active(value: boolean) {
    this._active = value;
  }

  get environmentLabelId(): number {
    return this._environmentLabelId;
  }
  set environmentLabelId(value: number) {
    this._environmentLabelId = value;
  }

  get fuelConsumption(): number {
    return this._fuelConsumption;
  }
  set fuelConsumption(value: number) {
    this._fuelConsumption = value;
  }

  get observations(): string {
    return this._observations;
  }
  set observations(value: string) {
    this._observations = value;
  }
}

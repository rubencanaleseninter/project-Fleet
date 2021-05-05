export class Driver {
  private _employeeId!: number;
  private _employeeName!: string;
  private _vehicleId!: string;

  get employeeId(): number {
    return this._employeeId;
  }
  set employeeId(value: number) {
    this._employeeId = value;
  }

  get employeeName(): string {
    return this._employeeName;
  }
  set employeeName(value: string) {
    this._employeeName = value;
  }

  get vehicleId(): string {
    return this._vehicleId;
  }
  set vehicleId(value: string) {
    this._vehicleId = value;
  }
}

export class Driver {
  constructor(
    private _codigoEmpleado = 0,
    private _nombreEmpleado = '',
    private _idVehiculo = 0
  ) {}

  get codigoEmpleado(): number {
    return this._codigoEmpleado;
  }
  set codigoEmpleado(value: number) {
    this._codigoEmpleado = value;
  }

  get nombreEmpleado(): string {
    return this._nombreEmpleado;
  }
  set nombreEmpleado(value: string) {
    this._nombreEmpleado = value;
  }

  get idVehiculo(): number {
    return this._idVehiculo;
  }
  set idVehiculo(value: number) {
    this._idVehiculo = value;
  }
}

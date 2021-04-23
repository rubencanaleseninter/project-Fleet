export class Driver {
  constructor(
    private _codigoEmpleado: number,
    private _nombreEmpleado: string,
    private _idVehiculo: number
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

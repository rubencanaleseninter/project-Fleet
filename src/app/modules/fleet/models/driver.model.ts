export class Driver {
  private _codigoEmpleado!: number;
  private _nombreEmpleado!: string;
  private _idVehiculo!: string[];

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

  get idVehiculo(): string[] {
    return this._idVehiculo;
  }
  set idVehiculo(value: string[]) {
    this._idVehiculo = value;
  }
}

export class Vehicle {
  constructor(
    private _id = 0,
    private _matricula = '',
    private _bastidor = '',
    private _modelo = '',
    private _tipofinanciacion = 0,
    private _fechaalta = '',
    private _idempresa = 0,
    private _kmactual = 0,
    private _idtipovehiculo = 0,
    private _IDtipoCombustible = 0,
    private _IDEmpresaFinanciacion = 0,
    private _NumeroContrato = 0,
    private _Kmmaximos = 0,
    private _Cuotamensual = 0,
    private _Activo = true,
    private _Observaciones = ''
  ) {}

  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }

  get matricula(): string {
    return this._matricula;
  }
  set matricula(value: string) {
    this._matricula = value;
  }

  get bastidor(): string {
    return this._bastidor;
  }
  set bastidor(value: string) {
    this._bastidor = value;
  }

  get modelo(): string {
    return this._modelo;
  }
  set modelo(value: string) {
    this._modelo = value;
  }

  get tipofinanciacion(): number {
    return this._tipofinanciacion;
  }
  set tipofinanciacion(value: number) {
    this._tipofinanciacion = value;
  }

  get fechaalta(): string {
    return this._fechaalta;
  }
  set fechaalta(value: string) {
    this._fechaalta = value;
  }

  get idempresa(): number {
    return this._idempresa;
  }
  set idempresa(value: number) {
    this._idempresa = value;
  }

  get kmactual(): number {
    return this._kmactual;
  }
  set kmactual(value: number) {
    this._kmactual = value;
  }

  get idtipovehiculo(): number {
    return this._idtipovehiculo;
  }
  set idtipovehiculo(value: number) {
    this._idtipovehiculo = value;
  }

  get IDtipoCombustible(): number {
    return this._IDtipoCombustible;
  }
  set IDtipoCombustible(value: number) {
    this._IDtipoCombustible = value;
  }

  get IDEmpresaFinanciacion(): number {
    return this._IDEmpresaFinanciacion;
  }
  set IDEmpresaFinanciacion(value: number) {
    this._IDEmpresaFinanciacion = value;
  }

  get NumeroContrato(): number {
    return this._NumeroContrato;
  }
  set NumeroContrato(value: number) {
    this._NumeroContrato = value;
  }

  get Kmmaximos(): number {
    return this._Kmmaximos;
  }
  set Kmmaximos(value: number) {
    this._Kmmaximos = value;
  }

  get Cuotamensual(): number {
    return this._Cuotamensual;
  }
  set Cuotamensual(value: number) {
    this._Cuotamensual = value;
  }

  get Activo(): boolean {
    return this._Activo;
  }
  set Activo(value: boolean) {
    this._Activo = value;
  }

  get Observaciones(): string {
    return this._Observaciones;
  }
  set Observaciones(value: string) {
    this._Observaciones = value;
  }
}

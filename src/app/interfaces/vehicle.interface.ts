export interface Vehicle {
  id: number;
  matricula: string;
  bastidor: string;
  modelo: string;
  tipofinanciacion: number;
  fechaalta: Date;
  idempresa: number;
  kmactual: number;
  idtipovehiculo: number;
  IDtipoCombustible: number;
  IDEmpresaFinanciacion: number;
  NumeroContrato: number;
  Kmmaximos: number;
  Cuotamensual: number;
  Activo: boolean;
  Observaciones: string;
}

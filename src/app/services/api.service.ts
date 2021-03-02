import { Injectable } from '@angular/core';
import { Fleet } from '../interfaces/fleet.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  data: Fleet[] = [{
    id: 1,
    matricula: '99999GXW',
    bastidor: 'fsfdsfdsfdsfds',
    modelo: 3,
    tipofinanciacion: 1,
    fechaalta: '',
    idempresa: 1,
    kmactual: 0,
    idtipovehiculo: 2,
    IDtipoCombustible: 2,
    IDEmpresaFinanciacion: 1,
    NumeroContrato: 123123,
    Kmmaximos: 8000,
    Cuotamensual: 1250,
    Activo: 1,
    Observaciones: 'Al coche fantástico no le funciona el Aire',
  }];
}

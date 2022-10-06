import { EstadoConcentracionParcelaria } from "./EstadoConcentracionParcelaria";

export class ConcentracionParcelaria {
  
  constructor(id = null, nombre = null, direccion_notificacion = null, estado = EstadoConcentracionParcelaria.CPC, zona_actuacion = null, recintos_interes = [], registros_documentales = [], terrenos = []) {
    this.id = id;
    this.nombre = nombre;
    this.direccion_notificacion = direccion_notificacion;
    this.estado = estado;
    this.zona_actuacion = zona_actuacion;
    this.recintos_interes = recintos_interes;
    this.registros_documentales = registros_documentales;
    this.terrenos = terrenos;
  }

}
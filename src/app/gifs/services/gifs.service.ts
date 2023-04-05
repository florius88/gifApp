import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];
  
  get historial() {
    /* Una manera de cortar el array es haciendo lo siguiente,
    pero tiene que trabajar cada vez que se llama al getter
    this._historial = this._historial.splice(0,10); */
    return [...this._historial];
  }

  buscarGifs( query: string) {

    query = query.trim().toLowerCase();

    // Evitamos repetidos
    if( !this._historial.includes(query) ) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
    }

    console.log(this._historial);
  }
  
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Gif, SearchGIFResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'R23VXsjAyA3M40Qt2ZNjQFrZcPpcPltu'
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  // TODO: Cambiar any por el tipo de dato correcto
  public resultados: Gif[] = [];

  get historial() {
    /* Una manera de cortar el array es haciendo lo siguiente,
    pero tiene que trabajar cada vez que se llama al getter
    this._historial = this._historial.splice(0,10); */
    return [...this._historial];
  }

  constructor(private http: HttpClient) {

    /* Recuperando datos del LocalStorage
    Esto podria funcionar, pero nos podria devolver un null
    this._historial = localStorage.getItem('historial');

    Como estoy comprobando antes en el if que el localstorage tenga algo,
    podemos hacerlo de esa manera y poniendo una admiracion al final para
    que TypeScript confie en nuestro codigo
    */
    /* if (localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    } */

    /* Otra manera de hacerlo es con los pipes, si es null, que me devuelva un 
    array vacio     */
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

  }

  buscarGifs(query: string) {

    query = query.trim().toLowerCase();

    // Evitamos repetidos
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      // Usando LocalStorage
      localStorage.setItem('historial', JSON.stringify(this._historial));

    }

    console.log(this._historial);

    // PETICION HTTP
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http.get<SearchGIFResponse>(`${this.servicioUrl}/search`, { params })
      .subscribe((resp: SearchGIFResponse) => {
        console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });

  }

}

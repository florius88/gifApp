import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Gif, SearchGIFResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apiKey: string = 'R23VXsjAyA3M40Qt2ZNjQFrZcPpcPltu'
  private _historial: string[] = [];

  // TODO: Cambiar any por el tipo de dato correcto
  public resultados: Gif[] = [];

  get historial() {
    /* Una manera de cortar el array es haciendo lo siguiente,
    pero tiene que trabajar cada vez que se llama al getter
    this._historial = this._historial.splice(0,10); */
    return [...this._historial];
  }

  constructor(private http: HttpClient) { }

  buscarGifs(query: string) {

    query = query.trim().toLowerCase();

    // Evitamos repetidos
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
    }

    console.log(this._historial);

    // PETICION HTTP
    this.http.get<SearchGIFResponse>(`https://api.giphy.com/v1/gifs/search?api_key=R23VXsjAyA3M40Qt2ZNjQFrZcPpcPltu&q=${query}&limit=10`)
    .subscribe( (resp: SearchGIFResponse) => {
      console.log(resp.data);
      this.resultados = resp.data;
    });

    
  }

}

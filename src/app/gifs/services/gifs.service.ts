import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apiKey: string = 'R23VXsjAyA3M40Qt2ZNjQFrZcPpcPltu'
  private _historial: string[] = [];

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
    /* Esta es una de las maneras de hacerlo, poniendo la palabra ASYNC al principio
    del metodo, pero angular ya dispone de un metodo de llamadas http
    const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=R23VXsjAyA3M40Qt2ZNjQFrZcPpcPltu&q=dragon ball&limit=10')
    const data = await resp.json();
    
    console.log(data); 
    */

    this.http.get('https://api.giphy.com/v1/gifs/search?api_key=R23VXsjAyA3M40Qt2ZNjQFrZcPpcPltu&q=dragon ball&limit=10')
    .subscribe( (resp: any) => {
      console.log(resp.data)
    });

    
  }

}

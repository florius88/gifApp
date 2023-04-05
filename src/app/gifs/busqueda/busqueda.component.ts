import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'
})
export class BusquedaComponent {

  /* Forma no reactiva
  buscar( valor: string ) {
    console.log(valor);
  } 
  */

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  buscar() {
    
    const valor = this.txtBuscar.nativeElement.value;

    console.log(valor);

    this.txtBuscar.nativeElement.value = '';
    
  }

}

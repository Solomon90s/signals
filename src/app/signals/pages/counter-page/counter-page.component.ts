import { Component, computed, signal } from '@angular/core';

@Component({
  templateUrl: './counter-page.component.html',
  styleUrls: ['./counter-page.component.css']
})
export class CounterPageComponent {

  // * Creación del signal, son writable, que se pueden escribir en ellas
  public counter = signal(10);

  // * Creación de signal, ESTE ES DE SÓLO LECTURA. TAMBIÉN SE APLICA A SERVICIOS
  public squareCounter = computed( () => this.counter() * this.counter() );

  increaseBy( value: number ) {
    // * Actualizar valor de la señal
    this.counter.update( current => current + value);
  }

}

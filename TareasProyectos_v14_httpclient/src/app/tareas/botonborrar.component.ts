import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { Tarea } from '../modelos/tarea';

@Component({
  selector: 'boton-borrar',
  templateUrl: './botonborrar.component.html',
})

export class BotonBorrarComponent implements OnChanges{
	@Input() id: number;
	@Output() borrarClicked: EventEmitter<string> = new EventEmitter<string>();

	ngOnChanges(sc:any): void {
    console.log('ngOnChanges',sc);
  }

  borraTarea(id:string) {
    console.log('Borrar ID:',id);
    this.borrarClicked.emit(id);
  }

}
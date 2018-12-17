import { Component, OnInit } from '@angular/core';

import {Tarea} from '../modelos/tarea';

import { TareasService } from '../servicios/tareas.service';


@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {
  textoafiltrar='';
  tareas:Tarea[];

  constructor(private _tareasService:TareasService) { }

  ngOnInit() {
    this._tareasService.getTareasFromApi().subscribe(
      (tareasfromapi:Tarea[]) => {this.tareas = tareasfromapi;},
      error => { console.log('Error en traer datos:', error); }

    );
  }

  borrar(tid: number): void {
   this._tareasService.borrarTareaFromAPIById(tid).subscribe(
     data=>{console.log('data:',data);},
     error => { console.log('error en borrar datos:', error);}
   ); 
  }

}

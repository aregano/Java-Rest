import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Tarea } from '../modelos/tarea';

import { TareasService } from '../servicios/tareas.service';

@Component({
  selector: 'detalle-tarea',
  templateUrl: './detalletarea.component.html'
})

export class DetalleTareaComponent implements OnInit{
  private _sub:any;
  private _tarea:Tarea;

  constructor(private route: ActivatedRoute, private _tareasService:TareasService) {
  }

  ngOnInit() {
    // Subscribe to route params
    this._sub = this.route.params.subscribe(params => {
      console.log('params',params);
      let tid = params['tid'];
      //this._tarea=this._tareasService.getTareaById(tid);
      this._tareasService.getTareaByIdFromAPI(tid).subscribe(
        data => { this._tarea = data;},
        error=>{console.log('Error on receiving tarea');}
      );

    });
  }

}
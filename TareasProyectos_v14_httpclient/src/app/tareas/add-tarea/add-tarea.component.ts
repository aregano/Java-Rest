import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../../modelos/proyecto';
import { Tarea } from '../../modelos/tarea';

import { ProyectosService } from '../../servicios/proyectos.service';
import { TareasService } from '../../servicios/tareas.service';

import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-tarea',
  templateUrl: './add-tarea.component.html',
  styleUrls: ['./add-tarea.component.css']
})
export class AddTareaComponent implements OnInit {

  form: FormGroup;
  proyectos: Proyecto[];

  _nuevaTarea: Tarea = new Tarea();
  serverError:string;

  constructor(private _proyectosService: ProyectosService, private _tareasService: TareasService, private _router: Router) { }

  ngOnInit() {
    this._proyectosService.getProyectosFromApi().subscribe(
      data => {
        this.proyectos = data;
      }
    );      
  }

  onSubmit(form: NgForm) {
    console.log('Formulario:', form);
    if (!form.valid) {
      return;
    } else {
      this._tareasService.addTareaToAPI(this._nuevaTarea).subscribe(
        data =>{
          this._router.navigate(['tareas']);
        },
        error =>{
          this.serverError='Ooops ha habido un error...por favor inténtalo nuevamente';
        }

      );
    }
  }

}

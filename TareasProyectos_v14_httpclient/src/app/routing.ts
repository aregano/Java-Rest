import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TareasComponent } from './tareas/tareas.component';
import { DetalleTareaComponent } from './tareas/detalletarea.component';
import { ProyectosComponent } from './proyectos/proyectos.component';

import { PageNotFoundComponent } from './commons/not-found.component';
import { AddTareaComponent } from './tareas/add-tarea/add-tarea.component';

const appRoutes: Routes = [
  { path: 'tareas', component: TareasComponent, pathMatch: 'full' },
  { path: 'tareas/new', component: AddTareaComponent, pathMatch: 'full' },
  { path: 'tareas/:tid', component: DetalleTareaComponent,pathMatch: 'full' },
  { path: 'proyectos', component: ProyectosComponent },
  { path: '',redirectTo: '/tareas',pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import {  HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Tarea } from '../modelos/tarea';

const API_URL = environment.apiUrl;

@Injectable()
export class TareasService {
	private _tareas:Tarea[];
	private _api="http://www.mocky.io/v2/5a2bf6862f0000281103932b";
	
	constructor(private _http: HttpClient){
	}

	getTareas(){
		return this._tareas;
	}

	getTareaById(tid:number):Tarea{
		return (this._tareas.filter(tarea => tarea.id == tid)[0]);
	}

	borrarTareaById(tid: number): void {
		console.log('Borrar tid de la lista:',tid);
		for (var i = 0; i < this._tareas.length; ++i) {
			if(this._tareas[i].id == tid ) this._tareas.splice(i,1);
		}
	}

	// Desde la API
	getTareasFromApi(){
		return this._http.get<Tarea[]>(`${API_URL}/tareas`)
		.pipe(
			tap(data =>this._tareas=data),
			catchError(this.handleError)
		);

	}

	getTareaByIdFromAPI(tid: number): Observable<Tarea> {
		return this._http.get<Tarea>(`${API_URL}/tareas/${tid}`)
			.pipe(
				tap(data => this._tareas = [data]),
				catchError(this.handleError)
			);
	}

	borrarTareaFromAPIById(tid: number): Observable<any> {
		return this._http.delete<any>(`${API_URL}/tareas/${tid}`);
	}

	addTareaToAPI(tarea:Tarea):Observable<any>{
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		};

		console.log('Tarea:',tarea);

		return this._http.post(`${API_URL}/tareas`, tarea, httpOptions).pipe(
			tap(data => this._tareas = [...this._tareas,tarea]),
			catchError(this.handleError)
		)
	}

	private handleError(error) {
		console.error('handleError:',error);
		return throwError(error || 'Server error');
	}
	
	
}

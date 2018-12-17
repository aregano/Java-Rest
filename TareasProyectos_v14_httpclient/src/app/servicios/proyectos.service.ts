import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import {  HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Proyecto } from '../modelos/proyecto';

@Injectable()
export class ProyectosService {
	private _proyectos:Proyecto[];

	private _api="http://www.mocky.io/v2/5a2bf7b32f0000871103932f";

	constructor(private _http: HttpClient){
	}

	getProyectos():Proyecto[]{
		return this._proyectos;
	}

	getProyectosFromApi(){
		return this._http.get<Proyecto[]>(this._api)
		.pipe(
			tap(data => this._proyectos = data),
			catchError(this.handleError)
		);
	}

	private handleError(error) {
		console.error(error);
		return Observable.throw(error || 'Server error');
	}

	
}

export class Tarea {

	id: number;
	descripcion: string;
	tiempo: number;
	proyecto: number;
	responsable: number;
	
	constructor(id?: number, descripcion?: string, tiempo?: number, proyecto?: number, responsable?: number) {
	
		this.id=id;
		this.descripcion=descripcion;
		this.tiempo=tiempo;
		this.proyecto=proyecto;
		this.responsable=responsable;
	}

}

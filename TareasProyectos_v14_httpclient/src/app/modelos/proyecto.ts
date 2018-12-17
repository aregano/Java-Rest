export class Proyecto {

	constructor (private _id:number,private _nombre:string, private _responsable?:number){
	}

	get id(): number{return this._id;}
	get nombre(): string{return this._nombre;}
	get responsable(): number{return this._responsable;}

	set id(id:number){this._id=id;}
	set nombre(nombre:string){this._nombre=nombre;}
	set responsable(responsable: number) { this._responsable = responsable;}
}

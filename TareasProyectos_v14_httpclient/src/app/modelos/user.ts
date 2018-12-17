export class User {
    constructor(private _id: number, private _name: string, private _email: string) {
    }

    get id(): number{return this._id;}
    get name(): string{return this._name;}
    get email(): string{return this._email;}

    set id(id: number){this._id=id;}
    set name(name: string){this._name=name;}
    set email(email: string){this._email=email;}

}
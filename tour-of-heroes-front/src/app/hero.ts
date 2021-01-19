export class Hero {

    _id: string;
    name: string;
    age: number;
    class: string;

    constructor(_id: string, name: string, age: number, class_: string) {
        this._id = _id;
        this.name = name;
        this.age = age;
        this.class = class_;
    }
}

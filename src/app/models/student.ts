export class Student {
    id : number;
    studentName : string;
    age : number;
    course : string;
    location : string;
    email : string;
    password : string;

    constructor(id:number, studentName:string, age:number, course:string, location:string, email:string, password:string) {
        this.id = id;
        this.studentName = studentName;
        this.age = age;
        this.course = course;
        this.location = location;
        this.email = email;
        this.password = password;
    }
}

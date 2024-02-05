import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }

  // json-server URL
  private URL:string = 'http://localhost:3000/Student';

  // Method to fetch all the student details
  getAllStudents():Observable<Student[]> {
    return this.http.get<Student[]>(`${this.URL}`);
  }

  // Method to fetch a single student using student id
  getStudent(id:any):Observable<Student> {
    return this.http.get<Student>(`${this.URL}/${id}`);
  }

  // Method to update a student data
  updateStudent(id:any, studentData:Student):Observable<Object> {
    return this.http.put(`${this.URL}/${id}`, studentData);
  }

  // Method to add a student data to the student collection
  addStudent(studentData:Student):Observable<Object> {
    const studData = {
      ...studentData,
      id: studentData.id.toString()
    };
    return this.http.post(`${this.URL}`, studData);
  }

  // Method to delete a student record
  deleteStudent(id:any):Observable<Object> {
    return this.http.delete(`${this.URL}/${id}`);
  }
}

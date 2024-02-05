import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css']
})
export class AllStudentsComponent implements OnInit{
  message:string = "";
  students:Student[] = [];
  studentId:number = 0;
  student:Student = new Student(0, "", 0, "", "","","");

  constructor(private router:Router,  private studentService :StudentService) {}

  // Automatically gets invoked during component initiazation
  ngOnInit():void {
    this.studentService.getAllStudents().subscribe((studentsData) => {
      this.students = studentsData;
      // Taking the last elements id to automatically provide id to newly added students
      this.studentId = this.students[this.students.length-1].id;
      this.studentId++;
    })
  }

  // Method which routes to particular student profile page
  getStudent(id:any) {
    this.router.navigate(['student', id]);
  }

  // Method to add  a new student record
  addStudentData() {
    this.student.id = this.studentId;
    this.studentService.addStudent(this.student).subscribe((data) => {
      this.student = new Student(0, "", 0, "", "","","");
      this.ngOnInit();
      this.message=`New record has been added`;
      setTimeout(()=>{this.message=""}, 2000);
    })
  }

  // Method to delete a student record
  deleteStudentData(id:any) {
    let confirmation = confirm('Are you sure to delete the record?');
    if(confirmation) {
      this.studentService.deleteStudent(id).subscribe((data) => {
        this.ngOnInit();
        this.message='Record deleted successfully';
      })
    } else {
      this.message='No record is deleted';
    }
    setTimeout(()=>{this.message=""}, 2000);
    
  }
}

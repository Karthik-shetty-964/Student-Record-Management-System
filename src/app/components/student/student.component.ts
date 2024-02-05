import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student';
import { StudentService } from 'src/app/services/student.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit{
  studId:number = 0;
  student:Student = new Student(0, "", 0, "", "", "", "");
  message:string = "";
  isLogout:boolean = false;
  isGoBack:boolean = false;

  constructor(private studentService:StudentService, private activatedRoute:ActivatedRoute, private router:Router) {}

  ngOnInit(): void {
      this.studId = this.activatedRoute.snapshot.params['id'];
      if(this.router.url === `/student/${this.studId}`) {
        this.isGoBack = true;
      } else {
        this.isLogout = true;
      }

      this.studentService.getStudent(this.studId).subscribe((studentData) => {
        this.student = studentData;
      })
  }

  editUserData() {
    this.studentService.updateStudent(this.studId, this.student).subscribe((studentData) => {
      this.message = 'Data updated successfully';
      setTimeout(() => {
        this.message = "";
      }, 2000);
    })
  }

  logout() {
    this.router.navigate(['']);
  }
  
  goBack() {
    this.router.navigate(['students']);
  }
}

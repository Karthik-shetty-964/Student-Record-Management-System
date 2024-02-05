import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userEmail : string = "";
  password : string = "";
  message : string = "";

  constructor(private router:Router, private studentService:StudentService){
    // Whenever the login page loads the session storage must be cleared
    sessionStorage.clear();
  }

  // function to authenticate user
  authenticateUser(loginForm : any) {

    if(loginForm.valid) {
      // Check if the logging in user is an admin 
      if(this.userEmail === "admin@gmail.com" && this.password === "@admin123") {
        sessionStorage.setItem('adminUser', this.userEmail);
        this.router.navigate(['students']);
        return;
      } 
      // Checks for the validation of normal user
      else {
        this.studentService.getAllStudents().subscribe((students) => {
          for(let student of students) {
            if(student.email === this.userEmail){
              if(student.password === this.password) {
                // If control comes here, then the user is valid and authenticated
                sessionStorage.setItem('student', student.email);
                sessionStorage.setItem('studentId', student.id.toString());
                this.router.navigate(['viewStudent', student.id]);  
              } else {
                this.message = "Password is incorrect";
                setTimeout(()=>{this.message=""}, 2000);
                return;
              }
            }
          }
          this.message = "User record doesn't exist"
          setTimeout(()=>{this.message=""}, 2000);
          return;
        })       
      }
    }
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor() { }
  // Returns true if the student is logged in or false otherwise
  isStudentLoggedIn():boolean {
    return sessionStorage.getItem('student') !== null;
  }

  // Returns true if the admin is loggin in or false otherwise
  isAdminLoggedIn():boolean {
    return sessionStorage.getItem('adminUser') !== null;
  }
}

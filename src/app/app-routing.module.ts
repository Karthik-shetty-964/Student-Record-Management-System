import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AllStudentsComponent } from './components/all-students/all-students.component';
import { StudentComponent } from './components/student/student.component';
import { adminGuardGuard } from './guards/admin-guard.guard';
import { studentGuardGuard } from './guards/student-guard.guard';

const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"students", component:AllStudentsComponent, canActivate:[adminGuardGuard]},
  {path:"student/:id", component:StudentComponent, canActivate:[adminGuardGuard]},
  {path:"viewStudent/:id", component:StudentComponent, canActivate:[studentGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

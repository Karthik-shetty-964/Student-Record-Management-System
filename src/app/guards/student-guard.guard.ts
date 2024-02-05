import { CanActivateFn, Router, ActivatedRoute } from '@angular/router';
import { GuardService } from '../services/guard.service';
import { inject } from '@angular/core';
import {Location} from '@angular/common';


const  guardService = new GuardService();
export const studentGuardGuard: CanActivateFn = (route, state) => {
  // const router = inject(Router);
  const location = inject(Location);
  const routeId = route.params['id'];
  const sessionId = sessionStorage.getItem('studentId')?.toString();

  if(guardService.isStudentLoggedIn() !== true) {
    alert("Unauthorized Access");
    location.back();
    // router.navigate(['']);
    return false;
  }
  // This condition is to check when one user is logged in and he is trying to access different user's data by changing the id in the URL
  else if(guardService.isStudentLoggedIn() === true && routeId !== sessionId) {
    alert("Unauthorized Access");
    location.back();
    return false;
  }
  return true;
};

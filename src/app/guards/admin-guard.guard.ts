import { CanActivateFn, Router } from '@angular/router';
import { GuardService } from '../services/guard.service';
import {inject} from '@angular/core';
import {Location} from '@angular/common';

//Instantiate guard service
const guardService = new GuardService();
export const adminGuardGuard: CanActivateFn = (route, state) => {
  // const router = inject(Router);
  const location = inject(Location);

  if(guardService.isAdminLoggedIn() !== true) {
    alert("Unauthorized Access");
    location.back();
    // router.navigateByUrl(location.path());
    return false;
  }

  return true;
};

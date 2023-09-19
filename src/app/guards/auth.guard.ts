import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const toast = inject(ToastrService);
  const router = inject(Router);
  if(auth.isLoggedIn()){
          return true
        }else{
          toast.error("Please Login First!","ERROR",{
            timeOut:5000,
            positionClass:"toast-top-center"
          });
          router.navigate(['login'])
          return false;
        }
};
 import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,private toast: ToastrService, private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.authService.getToken();
    
    if(myToken){
      request = request.clone({
        setHeaders:{Authorization:`Bearer ${myToken}`}
      })
    }


    return next.handle(request).pipe(
      catchError((error:any)=>{
        if(error instanceof HttpErrorResponse){
          if(error.status == 401){
            this.toast.warning("Token is expired!", "ERROR", {
              timeOut: 3000,
              positionClass:"toast-top-center"
            });
            this.router.navigate(['login']);
          }
        }        
        return throwError(()=> new Error(error.error.message));
      })
    );
  }
}

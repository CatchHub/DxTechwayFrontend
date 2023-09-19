import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = "https://localhost:7299/api/Users"
  constructor(private httpClient: HttpClient, private router:Router) { }


  // signUp(user:any){
  //   return this.httpClient.signUp({
  //     controller:"User"
  //   },user).subscribe(result=>{
  //     alert("success");
  //   })
  // }

  // logIn(user:any){
  //   return this.httpClient.signUp({
  //     controller:"User",
  //   },user).subscribe(result=>{
  //     alert("success");
  //   })
  // }

  signUp(user:any){
    return this.httpClient.post<any>(`${this.baseUrl}/register`,user)
  }
  logIn(user:any){
    return this.httpClient.post<any>(`${this.baseUrl}/authenticate`,user)
  }
  logOut(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  storeToken(tokenValue:string){    
    localStorage.setItem('token', tokenValue)
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem('token');
  } 


}

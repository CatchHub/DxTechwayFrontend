import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from 'src/app/helpers/validationform';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: ToastrService,
    // private userStore: UserStoreService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }
  onSubmit() {
    if(this.loginForm.valid){
      this.auth.logIn(this.loginForm.value).subscribe({
        next:(res)=>{
          this.loginForm.reset();
          this.auth.storeToken(res.value.token);
          this.toast.success(res.message, "SUCCESS", {
            timeOut: 5000,
            positionClass:"toast-top-center"
          });
          this.router.navigate(['appproduct']);
        },
        error:(err)=>{
          this.toast.error(err, "ERROR", {
            timeOut: 5000,
            positionClass:"toast-top-center"
          });
        }
      })
      
  
  }
  }
}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from 'src/app/helpers/validationform';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signUpForm!: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon:string = "fa-eye-slash"
  constructor(
    private fb : FormBuilder, 
    private auth: AuthService, 
    private toast: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      userName:['', Validators.required],
      email:['', Validators.required],
      password:['', Validators.required]
    })
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash'
    this.isText ? this.type = 'text' : this.type = 'password'
  }

  onSubmit() {


    if(this.signUpForm.valid){
      this.auth.signUp(this.signUpForm.value)
      .subscribe({
        next:(res)=>{
          this.toast.success(res.message, "Success", {
            timeOut: 5000,
            positionClass:"toast-top-center"
          });
          this.signUpForm.reset();
          this.router.navigate(['login']);
        },
        error:(err)=>{
          this.toast.error(err.message, "ERROR", {
            timeOut: 5000,
            positionClass:"toast-top-center"
          });
        }
      })
    }else{
        ValidateForm.validateAllFormFields(this.signUpForm)
    }
    // if (this.signUpForm.valid) {
    //   console.log(this.signUpForm.value);
    //   let signUpObj = {
    //     ...this.signUpForm.value,
    //     role:'',
    //     token:''
    //   }
    //   this.auth.signUp(signUpObj)
    //   .subscribe({
    //     next:(res=>{
    //       console.log(res.message);
    //       this.signUpForm.reset();
    //       this.router.navigate(['login']);
    //       alert(res.message)
    //     }),
    //     error:(err=>{
    //       alert(err?.error.message)
    //     })
    //   })
    // } else {
    //   ValidateForm.validateAllFormFields(this.signUpForm);
    // }
  }}

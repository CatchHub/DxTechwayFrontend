import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class productsComponent {
  constructor(private auth:AuthService, private toastr:ToastrService){
  }

  logOut(){
    this.auth.logOut();
    this.toastr.info("Logged out!", "Info", {
      timeOut: 3000,
      positionClass:"toast-top-center"
    });
  }
}

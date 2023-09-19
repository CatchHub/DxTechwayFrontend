import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Product } from '../contracts/product';
import { Observable, lastValueFrom, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class productService {

  productList!:Product[];
  constructor(private httpClientService: HttpClientService,private toast: ToastrService) { }

  getAllproducts():Observable<Product[]>{    
    return this.httpClientService.get<Product[]>({
      controller:"products"
    });
  }

  create(product:Product){
    this.httpClientService.post({
      controller:"Products"
    }, product)
    .subscribe(result => {
      this.toast.success("product added!", "SUCCESS", {
        timeOut: 3000,
        positionClass:"toast-top-center"
      });
    });
  }

  update(id:string,product:Product){
    this.httpClientService.put({
      controller:"Products"
    },product,id)
    .subscribe();
  }

  delete(id:string){
    this.httpClientService.delete({
      controller:"Products"
    },id)
    .subscribe(result=>{
      this.toast.error("product deleted!", "SUCCESS", {
        timeOut: 3000,
        positionClass:"toast-top-center"
      });
    });
  }
}

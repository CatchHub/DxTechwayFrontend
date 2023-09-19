import { withInterceptorsFromDi } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/contracts/product';
import { productService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddproductComponent  implements OnInit{
  @Output() event = new EventEmitter();
  currencyList= ["$","€","₺"];
  currencyCodeList=["USD","EUR","TRY"];
  isChecked : boolean = false;
  productForm!: FormGroup;
  constructor(
    private productService:productService, 
    private formBuider:FormBuilder,
    private toast: ToastrService,
    private router: Router
    ){
  }
    ngOnInit() {
    this.productForm = this.formBuider.group({
      name:["",Validators.required],
      productCode:["",[Validators.required,Validators.pattern(/^[0-9]*$/)]],
      detail:[],
      brand:["",Validators.required],
      price:["",[Validators.required,Validators.pattern(/^\d+(\.\d+)?$/)]],
      stock:["",[Validators.required,Validators.pattern(/^[0-9]*$/)]]
    });
  }
  
  addproduct(name:HTMLInputElement, detail:HTMLInputElement, productCode:HTMLInputElement,brand:HTMLInputElement,price:HTMLInputElement,currency:HTMLSelectElement,stock:HTMLInputElement){
    if(this.productForm.valid){
      const newproduct : Product = new Product();
    newproduct.name = name.value;
    newproduct.productCode = productCode.value;
    newproduct.brand = brand.value;
    newproduct.detail = detail.value;
    newproduct.price = parseFloat(price.value);
    newproduct.stock = parseInt(stock.value);
    const selectedCurrencyIndex = this.currencyList.indexOf(currency.value);
    if(selectedCurrencyIndex !== -1)
      newproduct.currencyCode = this.currencyCodeList[selectedCurrencyIndex];
    else
      newproduct.currencyCode = this.currencyCodeList[2];

    this.productService.create(newproduct);
    this.event.emit();
    setTimeout(() => {
    this.productForm.reset();
    }, 1000);
    }
    else {
      this.validateAllFormFields(this.productForm);
      this.toast.warning("Your Form is invalid!", "Warning", {
        timeOut: 3000,
        positionClass:"toast-top-center"
      });
    }
  }

  private validateAllFormFields(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true});
      }
      else if (control instanceof FormGroup){
        this.validateAllFormFields(control);
      }
    });
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/contracts/product';
import { productService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.scss']
})
export class EditproductComponent  implements OnInit{
  constructor(private productService:productService, private formBuider:FormBuilder, private toast: ToastrService){ }
  @Input() oldproduct:Product = new Product();
  @Output() event = new EventEmitter();

  
  currencyList= ["$","€","₺"];
  currencyCodeList=["USD","EUR","TRY"];
  productForm!: FormGroup;

    ngOnInit(): void {
      this.productForm = this.formBuider.group({
        name:["",Validators.required],
        productCode:["",[Validators.required,Validators.pattern(/^[0-9]*$/)]],
        detail:[],
        brand:["",Validators.required],
        price:["",[Validators.required,Validators.pattern(/^\d+(\.\d+)?$/)]],
        stock:["",[Validators.required,Validators.pattern(/^[0-9]*$/)]],
        currency:[]
      });
      this.productForm.controls['name'].setValue(this.oldproduct.name);
      this.productForm.controls['productCode'].setValue(this.oldproduct.productCode);    
      this.productForm.controls['detail'].setValue(this.oldproduct.detail);    
      this.productForm.controls['brand'].setValue(this.oldproduct.brand);    
      this.productForm.controls['price'].setValue(this.oldproduct.price);    
      this.productForm.controls['detail'].setValue(this.oldproduct.stock);  
      this.productForm.controls['stock'].setValue(this.oldproduct.stock);
      const selectedCurrencyIndex = this.currencyCodeList.indexOf(this.oldproduct.currencyCode!);
      if(selectedCurrencyIndex !== -1)
        this.productForm.controls['currency'].setValue(this.currencyList[selectedCurrencyIndex]); 
      else
        this.productForm.controls['currency'].setValue(this.currencyList[2]);
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

  editproduct(name:HTMLInputElement, detail:HTMLInputElement, productCode:HTMLInputElement,brand:HTMLInputElement,price:HTMLInputElement,currency:HTMLSelectElement,stock:HTMLInputElement){
    if(this.productForm.valid){
    const newproduct : Product = new Product();
    newproduct.id = this.oldproduct.id;
    newproduct.name = name.value;
    newproduct.productCode = productCode.value;
    newproduct.brand = brand.value;
    newproduct.detail = detail.value;
    newproduct.price = parseFloat(price.value);
    newproduct.stock = parseInt(stock.value);

    const selectedCurrencyIndex = this.currencyList.indexOf(currency.value);
    if(selectedCurrencyIndex !== -1)
      newproduct.currencyCode = this.currencyCodeList[selectedCurrencyIndex];
    else if(this.currencyCodeList.indexOf(currency.value) != -1)
      newproduct.currencyCode = currency.value;
    else
      newproduct.currencyCode = this.currencyCodeList[2];

    this.productService.update(this.oldproduct.id!,newproduct);
    this.toast.success("product updated!", "SUCCESS", {
      timeOut: 3000,
      positionClass:"toast-top-center"
    });
    
    this.event.emit();
    }
    else {
      this.validateAllFormFields(this.productForm);
      this.toast.warning("Your Form is invalid!", "Warning", {
        timeOut: 3000,
        positionClass:"toast-top-center"
      });
    }
  }
}

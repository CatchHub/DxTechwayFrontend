import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/contracts/product';
import { productService } from 'src/app/services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-show-product',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.scss']
})
export class ShowproductComponent implements OnInit {
  currencyList= ["$","€","₺"];
  currencyCodeList=["USD","EUR","TRY"];
  productList !: Product[];
  dataSource:any;
  displayedColumns:string[]=["name","productCode","detail","brand","price","stock","action"];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  product:any;

  // productList$!: Observable<Product[]>;
  // uncompletedProductList$: Product[] = [];
  // completedProductList$: Product[] = [];
  activateEditproductComponent: boolean = false;
  activateAddproductComponent: boolean = false;
  constructor(private productService:productService){
    this.loadProduct();
   }

   ngOnInit() {
  }
 
  loadProduct(){
    // this.productList$ = this.productService.getAllproducts();
    this.productService.getAllproducts().subscribe(res=>{
      this.productList = res;
      this.dataSource = new MatTableDataSource<Product>(this.productList);
      
    setTimeout(() => this.dataSource.paginator = this.paginator);
    // this.dataSource.paginator = this.paginator;
    setTimeout(() => this.dataSource.sort = this.sort); 
    })
    // this.productList = [
    //   {
    //     "name":"ThinkPad",
    //     "brand":"Lenovo",
    //     "detail":"Thinkpad 11.12",
    //     "productCode":"11111",
    //     "id":"1",
    //     "currency":"TRY",
    //     "stock":11,
    //     "price":1111.99
    //   },
    //   {
    //     "name":"Apple Watch 3.0 test",
    //     "brand":"Apple LTD",
    //     "detail":"newest apple watch 3.0",
    //     "productCode":"12121",
    //     "id":"2",
    //     "currency":"EUR",
    //     "stock":17,
    //     "price":1222.88
    //   },
    //   {
    //     "name":"13",
    //     "brand":"Brand13",
    //     "detail":"Detai13",
    //     "productCode":"ProductCode13",
    //     "id":"3",
    //     "currency":"USD",
    //     "stock":13,
    //     "price":13.13
    //   },
    //   {
    //     "name":"ThinkPad",
    //     "brand":"Lenovo",
    //     "detail":"Thinkpad 11.12",
    //     "productCode":"11111",
    //     "id":"1",
    //     "currency":"TRY",
    //     "stock":11,
    //     "price":1111.99
    //   },
    //   {
    //     "name":"Apple Watch 3.0 test",
    //     "brand":"Apple LTD",
    //     "detail":"newest apple watch 3.0",
    //     "productCode":"12121",
    //     "id":"2",
    //     "currency":"EUR",
    //     "stock":17,
    //     "price":1222.88
    //   },
    //   {
    //     "name":"13",
    //     "brand":"Brand13",
    //     "detail":"Detai13",
    //     "productCode":"ProductCode13",
    //     "id":"3",
    //     "currency":"USD",
    //     "stock":13,
    //     "price":13.13
    //   }
    // ]
    // this.dataSource = new MatTableDataSource<Product>(this.productList);
  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  modalAdd(){
    this.activateAddproductComponent = true;
  }
  modalEdit(product:Product){
    this.product = product;
    this.activateEditproductComponent = true;
  }

  modalDelete(product:Product){
    this.productService.delete(product.id!);
  }
  modalClose(){
    this.activateEditproductComponent= false;
  }
  getCurrencySymbol(currency:string){
    const selectedCurrencyIndex = this.currencyCodeList.indexOf(currency!);
    if(selectedCurrencyIndex !== -1)
      return this.currencyList[selectedCurrencyIndex]; 
    else
    return this.currencyList[1];
  }
  // updateData(){
  //   this.productList$ = this.productService.getAllproducts();
  //   setTimeout(() => {
  //     this.setTables();
  //     },150);
  // }
  }



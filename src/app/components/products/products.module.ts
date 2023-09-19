import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { productsComponent } from './products.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ShowproductComponent } from './show-products/show-products.component';
import { AddproductComponent } from './add-products/add-products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditproductComponent } from './edit-products/edit-products.component';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortHeader, MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    productsComponent,
    ShowproductComponent,
    AddproductComponent,
    EditproductComponent
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    CdkAccordionModule,
    MatExpansionModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule
  ],
  exports:[
    productsComponent,
    ShowproductComponent,
    AddproductComponent
  ]
})
export class productsModule { }

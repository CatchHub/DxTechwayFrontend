import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditproductComponent } from './edit-products.component';

describe('EditProductsComponent', () => {
  let component: EditproductComponent;
  let fixture: ComponentFixture<EditproductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditproductComponent]
    });
    fixture = TestBed.createComponent(EditproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

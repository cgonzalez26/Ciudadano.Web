import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpuestosTsgTableComponent } from './impuestos_tsg-table.component';

describe('ImpuestosTsgTableComponent', () => {
  let component: ImpuestosTsgTableComponent;
  let fixture: ComponentFixture<ImpuestosTsgTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpuestosTsgTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpuestosTsgTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

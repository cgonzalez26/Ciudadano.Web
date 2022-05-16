import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpuestosTsgComponent } from './impuestos_tsg.component';

describe('ImpuestosTsgComponent', () => {
  let component: ImpuestosTsgComponent;
  let fixture: ComponentFixture<ImpuestosTsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpuestosTsgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpuestosTsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

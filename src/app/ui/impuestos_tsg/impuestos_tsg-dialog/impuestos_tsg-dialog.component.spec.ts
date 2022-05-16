import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpuestosTsgDialogComponent } from './impuestos_tsg-dialog.component';

describe('ImpuestosTsgDialogComponent', () => {
  let component: ImpuestosTsgDialogComponent;
  let fixture: ComponentFixture<ImpuestosTsgDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpuestosTsgDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpuestosTsgDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

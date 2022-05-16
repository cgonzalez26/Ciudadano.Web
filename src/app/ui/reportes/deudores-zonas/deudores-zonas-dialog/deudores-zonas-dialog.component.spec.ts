import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeudoresZonasDialogComponent } from './deudores-zonas-dialog.component';

describe('DeudoresZonasDialogComponent', () => {
  let component: DeudoresZonasDialogComponent;
  let fixture: ComponentFixture<DeudoresZonasDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeudoresZonasDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeudoresZonasDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablecimientosDialogComponent } from './establecimientos-dialog.component';

describe('EstablecimientosDialogComponent', () => {
  let component: EstablecimientosDialogComponent;
  let fixture: ComponentFixture<EstablecimientosDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstablecimientosDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstablecimientosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

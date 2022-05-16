import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablecimientosTableComponent } from './establecimientos-table.component';

describe('EstablecimientosTableComponent', () => {
  let component: EstablecimientosTableComponent;
  let fixture: ComponentFixture<EstablecimientosTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstablecimientosTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstablecimientosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

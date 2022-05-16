import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeudoresZonasTableComponent } from './deudores-zonas-table.component';

describe('DeudoresZonasTableComponent', () => {
  let component: DeudoresZonasTableComponent;
  let fixture: ComponentFixture<DeudoresZonasTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeudoresZonasTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeudoresZonasTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

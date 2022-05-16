import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeudoresZonasComponent } from './deudores-zonas.component';

describe('DeudoresZonasComponent', () => {
  let component: DeudoresZonasComponent;
  let fixture: ComponentFixture<DeudoresZonasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeudoresZonasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeudoresZonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

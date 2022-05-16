import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpuestosInmTableComponent } from './impuestos_inm-table.component';

describe('ImpuestosInmTableComponent', () => {
  let component: ImpuestosInmTableComponent;
  let fixture: ComponentFixture<ImpuestosInmTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpuestosInmTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpuestosInmTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

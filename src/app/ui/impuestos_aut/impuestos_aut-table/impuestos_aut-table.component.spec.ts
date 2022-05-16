import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpuestosAutTableComponent } from './impuestos_aut-table.component';

describe('ImpuestosAutTableComponent', () => {
  let component: ImpuestosAutTableComponent;
  let fixture: ComponentFixture<ImpuestosAutTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpuestosAutTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpuestosAutTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpuestosAutBoletaComponent } from './impuestos-aut-boleta.component';

describe('ImpuestosAutBoletaComponent', () => {
  let component: ImpuestosAutBoletaComponent;
  let fixture: ComponentFixture<ImpuestosAutBoletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpuestosAutBoletaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpuestosAutBoletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

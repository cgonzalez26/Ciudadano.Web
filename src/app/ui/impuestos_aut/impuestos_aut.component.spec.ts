import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpuestosAutComponent } from './impuestos_aut.component';

describe('ImpuestosAutComponent', () => {
  let component: ImpuestosAutComponent;
  let fixture: ComponentFixture<ImpuestosAutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpuestosAutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpuestosAutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

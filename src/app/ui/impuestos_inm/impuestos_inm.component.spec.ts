import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpuestosInmComponent } from './impuestos_inm.component';

describe('ImpuestosInmComponent', () => {
  let component: ImpuestosInmComponent;
  let fixture: ComponentFixture<ImpuestosInmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpuestosInmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpuestosInmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

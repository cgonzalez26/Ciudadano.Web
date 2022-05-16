import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpuestosInmDialogComponent } from './impuestos_inm-dialog.component';

describe('ImpuestosInmDialogComponent', () => {
  let component: ImpuestosInmDialogComponent;
  let fixture: ComponentFixture<ImpuestosInmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpuestosInmDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpuestosInmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

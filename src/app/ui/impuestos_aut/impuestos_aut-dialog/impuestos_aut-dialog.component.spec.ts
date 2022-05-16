import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpuestosAutDialogComponent } from './impuestos_aut-dialog.component';

describe('ImpuestosAutDialogComponent', () => {
  let component: ImpuestosAutDialogComponent;
  let fixture: ComponentFixture<ImpuestosAutDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpuestosAutDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpuestosAutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

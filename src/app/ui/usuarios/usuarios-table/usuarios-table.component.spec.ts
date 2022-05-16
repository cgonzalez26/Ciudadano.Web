import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosTableComponent } from './usuarios-table.component';

describe('UsuariosTableComponent', () => {
  let component: UsuariosTableComponent;
  let fixture: ComponentFixture<UsuariosTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

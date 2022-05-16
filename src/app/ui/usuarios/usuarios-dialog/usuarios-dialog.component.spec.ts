import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosDialogComponent } from './usuarios-dialog.component';

describe('UsuariosDialogComponent', () => {
  let component: UsuariosDialogComponent;
  let fixture: ComponentFixture<UsuariosDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

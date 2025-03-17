import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaConfirmacaoComponent } from './tela-confirmacao.component';

describe('TelaConfirmacaoComponent', () => {
  let component: TelaConfirmacaoComponent;
  let fixture: ComponentFixture<TelaConfirmacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaConfirmacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaConfirmacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

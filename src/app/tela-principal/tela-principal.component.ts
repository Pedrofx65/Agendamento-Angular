import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-principal',
  imports: [],
  templateUrl: './tela-principal.component.html',
  styleUrl: './tela-principal.component.css'
})
export class TelaPrincipalComponent {
  constructor(private router: Router) {}

  irParaAgendamento() {
    this.router.navigate(['/agendamento']);
  }
}

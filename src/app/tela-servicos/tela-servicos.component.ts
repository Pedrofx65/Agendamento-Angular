import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-servicos',
  imports: [CommonModule, NgFor],
  templateUrl: './tela-servicos.component.html',
  styleUrls: ['./tela-servicos.component.css']
})
export class TelaServicosComponent {
  servicos = [
    { value: 'clareamento', label: 'Clareamento Dental', icon: 'fas fa-sun', description: 'Sorrisos mais brancos e brilhantes com tratamentos seguros e eficazes.' },
    { value: 'ortodontia', label: 'Ortodontia', icon: 'fas fa-teeth', description: 'Correção alinhada e personalizada com aparelhos fixos ou invisíveis.' },
    { value: 'implantes', label: 'Implantes Dentários', icon: 'fas fa-tooth', description: 'Soluções permanentes para reposição de dentes.' },
    { value: 'odontopediatria', label: 'Odontopediatria', icon: 'fas fa-child', description: 'Cuidados especializados para crianças.' },
    { value: 'canal', label: 'Tratamento de Canal', icon: 'fas fa-syringe', description: 'Alívio da dor e preservação do dente com procedimentos modernos.' },
    { value: 'prevencao', label: 'Prevenção e Limpeza', icon: 'fas fa-shield-alt', description: 'Manutenção da saúde bucal com profilaxia profissional.' }
  ];

  constructor(private router: Router) {}

  irParaAgendamento() {
    this.router.navigate(['/agendamento']);
  }

  voltar() {
    this.router.navigate(['/']);
  }
}
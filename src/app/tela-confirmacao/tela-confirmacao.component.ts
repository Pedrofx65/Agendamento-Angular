import { CommonModule, isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-confirmacao',
  imports: [NgIf, NgFor, CommonModule],
  templateUrl: './tela-confirmacao.component.html',
  styleUrl: './tela-confirmacao.component.css'
})
export class TelaConfirmacaoComponent implements OnInit {
  agendamentos: any[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object ,private router: Router) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const agendamentosSalvos = localStorage.getItem('agendamentosOdontoHub');
      if (agendamentosSalvos) {
        this.agendamentos = JSON.parse(agendamentosSalvos);
      }
    }
  }

  getServicoIcon(servico: string): string {
  const icons: {[key: string]: string} = {
    'consulta': 'fas fa-stethoscope',
    'limpeza': 'fas fa-broom',
    'clareamento': 'fas fa-tooth',
    'extração': 'fas fa-teeth',
    'ortodontia': 'fas fa-teeth-open',
    'restauração': 'fas fa-cube',
    'implante': 'fas fa-teeth',
    'protese': 'fas fa-teeth',
    // Adicione outros serviços conforme necessário
  };
  
  return icons[servico.toLowerCase()] || 'fas fa-calendar-check'; // Ícone padrão
}

  getServicoLabel(servicoValue: string): string {
    const servicos = [
      { value: 'clareamento', label: 'Clareamento' },
      { value: 'canal', label: 'Tratamento de Canal' },
      // ... (outros serviços)
    ];
    const servico = servicos.find(s => s.value === servicoValue);
    return servico ? servico.label : servicoValue;
  }

  formatarData(data: string): string {
    if (!data) return '';
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR');
  }

  getStatus(dataAgendamento: string): string {
    const hoje = new Date();
    const data = new Date(dataAgendamento);
    return data > hoje ? 'Agendado' : 'Realizado';
  }

  irParaAgendamento() {
    this.router.navigate(['/agendamento']);
  }
  getDay(dateString: string): string {
    const date = new Date(dateString);
    return date.getDate().toString();
  }

  getMonth(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'short' }).toUpperCase();
  }

  isUpcoming(dateString: string): boolean {
    const appointmentDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Remove a parte de horas para comparação
    return appointmentDate >= today;
  }

  cancelarAgendamento(id: number): void {
    this.agendamentos = this.agendamentos.filter(a => a.id !== id);
    localStorage.setItem('agendamentosOdontoHub', JSON.stringify(this.agendamentos));
  }
}

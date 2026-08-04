import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-principal',
  imports: [],
  templateUrl: './tela-principal.component.html',
  styleUrl: './tela-principal.component.css'
})
export class TelaPrincipalComponent {
  // Dados de contato centralizados aqui: evita repetir o mesmo texto em
  // várias partes do HTML (seção de contato, rodapé, botão do WhatsApp etc.)
  endereco = 'Av. Araucárias, 346, Águas Claras, Brasília - DF';
  telefoneExibicao = '(61) 97654-3210';
  telefoneDDI = '5561976543210'; // formato internacional, usado no WhatsApp e no link "tel:"
  email = 'contato@odontohub.com';
  mensagemWhatsapp = 'Olá! Gostaria de agendar uma consulta na OdontoHub.';
  avaliacaoGoogle = '4.9';

  constructor(private router: Router) {}

  irParaAgendamento() {
    this.router.navigate(['/agendamento']);
  }

  irParaServicos() {
    this.router.navigate(['/servicos']);
  }

  get linkWhatsapp(): string {
    return `https://wa.me/${this.telefoneDDI}?text=${encodeURIComponent(this.mensagemWhatsapp)}`;
  }

  get linkTelefone(): string {
    return `tel:+${this.telefoneDDI}`;
  }

  get linkEmail(): string {
    return `mailto:${this.email}`;
  }

  get linkComoChegar(): string {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(this.endereco)}`;
  }
}
import { Routes } from '@angular/router';
import { TelaPrincipalComponent } from './tela-principal/tela-principal.component';
import { TelaAgendamentoComponent } from './tela-agendamento/tela-agendamento.component';
import { TelaConfirmacaoComponent } from './tela-confirmacao/tela-confirmacao.component';

export const routes: Routes = [
  { 
    path: '', 
    component: TelaPrincipalComponent 
  },
  { 
    path: 'agendamento', 
    component: TelaAgendamentoComponent 
  },
  { 
    path: 'agendados', 
    component: TelaConfirmacaoComponent
  }
];

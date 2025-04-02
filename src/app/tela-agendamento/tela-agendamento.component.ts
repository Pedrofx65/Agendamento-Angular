import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface Profissional {
  id: number;
  nome: string;
  especialidade: string;
  formacao: string;
  experiencia: string;
  bio: string;
  foto?: string;
  servicos: string[];
}

@Component({
  selector: 'app-tela-agendamento',
  imports: [ReactiveFormsModule, CommonModule  ],
  templateUrl: './tela-agendamento.component.html',
  styleUrl: './tela-agendamento.component.css'
})

export class TelaAgendamentoComponent implements OnInit {
  agendamentoForm!: FormGroup;
  submitting = false;
  submitted = false;
  successMessage = '';
  errorMessage = '';
  showConfirmationModal = false;
  
  minDate: string;
  maxDate: string;
  
  servicosDisponiveis = [
    { value: 'clareamento', label: 'Clareamento' },
    { value: 'canal', label: 'Tratamento de Canal' },
    { value: 'carie', label: 'Tratamento de Cárie' },
    { value: 'avaliacao', label: 'Avaliação' },
    { value: 'extracao', label: 'Extração Dentária' },
    { value: 'cirurgias', label: 'Cirúrgias' },
  ];

  profissionais: Profissional[] = [
    {
      id: 1,
      nome: 'Dra. Ana Silva',
      especialidade: 'Clareamento Dental',
      formacao: 'Mestre em Odontologia Estética - USP',
      experiencia: '10 anos de experiência',
      bio: 'Especializada em clareamentos e estética dental, com mais de 500 procedimentos realizados.',
      servicos: ['clareamento', 'avaliacao'],
      foto: 'https://img.freepik.com/fotos-gratis/jovem-medico-sorridente-usando-estetoscopio-e-vestido-de-medico-cruzando-as-maos-na-parede-branca_141793-27091.jpg?t=st=1742862620~exp=1742866220~hmac=d3f80af79c8fd3031e0786c98604fe67cb0ae30394cb53566b0f436effce237d&w=996'
    },
    {
      id: 2,
      nome: 'Dr. Carlos Mendes',
      especialidade: 'Endodontia',
      formacao: 'Especialista em Endodontia - UNESP',
      experiencia: '8 anos de experiência',
      bio: 'Expert em tratamentos de canal e procedimentos endodônticos complexos.',
      servicos: ['canal', 'extracao', 'cirurgias'],
      foto: 'https://img.freepik.com/fotos-premium/um-homem-de-roupa-azul-esta-em-uma-sala-com-uma-escova-de-dentes-na-mao_1319323-406.jpg?w=826'
    },
    {
      id: 3,
      nome: 'Dra. Maria Oliveira',
      especialidade: 'Dentística Restauradora',
      formacao: 'Especialista em Dentística - UFMG',
      experiencia: '6 anos de experiência',
      bio: 'Dedicada ao tratamento de cáries e restaurações estéticas de alta qualidade.',
      servicos: ['carie', 'avaliacao'],
      foto: 'https://website.cfo.org.br/wp-content/uploads/2018/03/dentista.jpg'
    }
  ];

  profissionaisFiltrados: Profissional[] = [];
  profissionalSelecionado: Profissional | null = null;

  constructor(private fb: FormBuilder, private router: Router) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);
    this.maxDate = maxDate.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.agendamentoForm = this.fb.group({
      servico: ['', Validators.required],
      profissional: ['', Validators.required],
      data: ['', [Validators.required, this.dateValidator()]],
      hora: ['', [Validators.required, this.timeValidator()]],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      telefone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\)\s?\d{4,5}-\d{4}$/)]],
      email: ['', Validators.email],
      observacoes: [''],
      lembreteSMS: [false],
      lembreteWhatsApp: [false],
      lembreteEmail: [false]
    });
  }

  filtrarProfissionaisPorServico(): void {
    const servicoSelecionado = this.agendamentoForm.get('servico')?.value;
    this.profissionaisFiltrados = servicoSelecionado 
      ? this.profissionais.filter(prof => prof.servicos.includes(servicoSelecionado))
      : [];
    
    this.agendamentoForm.get('profissional')?.reset();
    this.profissionalSelecionado = null;
  }

  mostrarDetalhesProfissional(): void {
    const profissionalId = this.agendamentoForm.get('profissional')?.value;
    this.profissionalSelecionado = profissionalId 
      ? this.profissionais.find(prof => prof.id === Number(profissionalId)) || null
      : null;
  }

  dateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      const selectedDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate.getDay() === 0 || selectedDate.getDay() === 6) {
        return { weekend: true };
      }
      
      if (selectedDate < today) {
        return { minDate: true };
      }
      
      const maxDate = new Date();
      maxDate.setDate(today.getDate() + 30);
      if (selectedDate > maxDate) {
        return { maxDate: true };
      }
      
      return null;
    };
  }

  timeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      const [hours, minutes] = control.value.split(':').map(Number);
      
      if (hours < 8 || (hours === 8 && minutes < 0)) {
        return { minTime: true };
      }
      
      if (hours > 18 || (hours === 18 && minutes > 0)) {
        return { maxTime: true };
      }
      
      return null;
    };
  }

  formatarTelefone(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
    }
    if (value.length > 10) {
      value = `${value.substring(0, 10)}-${value.substring(10, 14)}`;
    }
    this.agendamentoForm.get('telefone')?.setValue(value, { emitEvent: false });
  }

  getServicoLabel(servicoValue: string): string {
    const servico = this.servicosDisponiveis.find(s => s.value === servicoValue);
    return servico ? servico.label : servicoValue;
  }

  formatarData(data: string): string {
    if (!data) return '';
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  onSubmit(): void {
    this.submitted = true;
    
    if (this.agendamentoForm.invalid) {
      this.agendamentoForm.markAllAsTouched();
      return;
    }
    
    this.showConfirmationModal = true;
  }

  confirmarAgendamento(): void {
    this.showConfirmationModal = false;
    this.submitting = true;
    
    const novoAgendamento = {
      ...this.agendamentoForm.value,
      profissional: this.profissionalSelecionado,
      dataAgendamento: new Date().toISOString(),
      id: Date.now()
    };
    
    const agendamentosSalvos = localStorage.getItem('agendamentosOdontoHub');
    let agendamentos = agendamentosSalvos ? JSON.parse(agendamentosSalvos) : [];
    agendamentos.push(novoAgendamento);
    localStorage.setItem('agendamentosOdontoHub', JSON.stringify(agendamentos));
     
    setTimeout(() => {
      this.submitting = false;
      this.successMessage = 'Agendamento realizado com sucesso!';
      
      const lembretes = [];
      if (this.agendamentoForm.value.lembreteEmail) lembretes.push('e-mail');
      if (this.agendamentoForm.value.lembreteSMS) lembretes.push('SMS');
      if (this.agendamentoForm.value.lembreteWhatsApp) lembretes.push('WhatsApp');
      
      if (lembretes.length > 0) {
        this.successMessage += ` Você receberá lembretes por ${lembretes.join(' e ')}.`;
      }
      
      this.agendamentoForm.reset();
      this.submitted = false;
      this.profissionalSelecionado = null;
    }, 1500);
  }

  cancelarAgendamento(): void {
    this.showConfirmationModal = false;
  }

  irParaAgendados() {
    this.router.navigate(['/agendados']);
  }
}

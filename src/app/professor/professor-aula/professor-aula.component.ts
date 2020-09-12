import { Professor, ProfessorMateria } from './../../model/professor';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessorService } from './../../services/professor.service';
import { ComumService } from './../../services/comum.service';
import { Base } from './../../model/base';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-professor-aula',
  templateUrl: './professor-aula.component.html',
  styleUrls: ['./professor-aula.component.css']
})
export class ProfessorAulaComponent implements OnInit {

  listaMateria = [] as Base[];
  listaSemana = [] as Base[];
  professor = {} as Professor;
  listaProfessorMateria = [] as ProfessorMateria[];
  form = new FormGroup({});
  nomeColunas: string[] = ['nomeMateria', 'valor', 'horarioInicio', 'horarioFim', 'opcao'];
  diaSemana: number;
  constructor(private fb: FormBuilder, private comumService: ComumService, private professorService: ProfessorService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    const id = +this.route.snapshot.paramMap.get('id');

    forkJoin(this.comumService.listarMateria(), this.comumService.listarSemana(), this.professorService.obter({ id })).subscribe((resultados) => {
      this.listaMateria = resultados[0];
      this.listaSemana = resultados[1];
      this.professor = resultados[2];

      this.form = this.fb.group({
        id: 0,
        idProfessor: this.professor.id,
        idMateria: 0,
        diaSemana: 0,
        indVoluntario: false,
        valor: 0,
        horarioInicio: '',
        horarioFim: ''
      });

    },
      (erro) => {
        alert(erro.error);
      }
    );
  }

  atualizarDados(): void {
    this.router.navigateByUrl(`/professor/atualizar/${this.professor.id}`);
  }

  preencherAgenda(diaSemana): void {
    this.diaSemana = +diaSemana;
    this.professorService.listarAgenda({
      idProfessor: this.professor.id,
      diaSemana: this.diaSemana
    }).subscribe((agendas) => {

      if (agendas ?.length > 0) {
        this.listaProfessorMateria = agendas.map(
          (professorMateria) => {
            professorMateria.nomeMateria = this.listaMateria.find(x => x.id === professorMateria.idMateria).nome;
            return professorMateria;
          });
      }

      this.listaProfessorMateria = agendas;
    });
  }

  removerAgenda(id: number): void {
    this.professorService.excluirAgenda({ id }).subscribe(() => {
    }, (error) => {
      console.log(error.error);
    }, () => {
      this.preencherAgenda(this.diaSemana.toString());
    });
  }

  incluirAgenda(): void {
    const professorMateria = this.form.value as ProfessorMateria;

    professorMateria.diaSemana = +this.diaSemana;
    professorMateria.idMateria = +professorMateria.idMateria;

    if (!professorMateria.diaSemana) {
      alert('Selecione a dia da semana.');
      return;
    }

    if (!professorMateria.idMateria) {
      alert('Selecione a matricula.');
      return;
    }

    if (!professorMateria.indVoluntario && !professorMateria.valor) {
      alert('Informe o valor aula.');
      return;
    }

    if (!professorMateria.horarioInicio) {
      alert('Selecione a horário de início.');
      return;
    }

    if (!professorMateria.horarioFim) {
      alert('Selecione a horário de fim.');
      return;
    }

    this.professorService.incluirAgenda(professorMateria).subscribe((response) => {
      this.preencherAgenda(this.diaSemana.toString());
      this.form.controls.horarioInicio.setValue(professorMateria.horarioFim);
      this.form.controls.horarioFim.setValue('');
    },
      (error) => {
        alert(error.error);
      });
  }

}
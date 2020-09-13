import { forkJoin } from 'rxjs';
import { AlunoService } from './../../services/aluno.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessorService } from './../../services/professor.service';
import { ComumService } from './../../services/comum.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Aluno } from './../../model/aluno';
import { Base } from './../../model/base';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aluno-aula',
  templateUrl: './aluno-aula.component.html',
  styleUrls: ['./aluno-aula.component.css']
})
export class AlunoAulaComponent implements OnInit {

  listaMateria = [] as Base[];
  listaSemana = [] as Base[];
  aluno = {} as Aluno;
  form = new FormGroup({});

  constructor(private fb: FormBuilder, private comumService: ComumService, private alunoService: AlunoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    const id = +this.route.snapshot.paramMap.get('id');

    forkJoin(this.comumService.listarMateria(), this.comumService.listarSemana(), this.alunoService.obter({ id })).subscribe((resultados) => {
      this.listaMateria = resultados[0];
      this.listaSemana = resultados[1];
      this.aluno = resultados[2];

      this.form = this.fb.group({
        id: 0,
        idAluno: this.aluno.id,
        idMateria: 0,
        diaSemana: 0,
        indVoluntario: false,
      });

    },
      (erro) => {
        alert(erro.error);
      }
    );
  }

  atualizarDados(): void {
    this.router.navigateByUrl(`/aluno/atualizar/${this.aluno.id}`);
  }
}

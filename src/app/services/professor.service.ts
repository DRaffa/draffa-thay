import { Observable, of } from 'rxjs';
import { Professor, ProfessorMateria } from './../model/professor';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  listaProfessores = [{
    id: 1,
    biografia: 'teste',
    email: 'r@r.com',
    senha: '123',
    nome: 'Rafael',
    whatsapp: '11976235899',
    avatar: 'teste'
  },
  {
    id: 2,
    biografia: 'teste',
    email: 't@t.com',
    senha: '123',
    nome: 'Thayani',
    whatsapp: '11976235899',
    avatar: 'teste'
  }] as Professor[];

  listaAgenda = [{
    id: 1,
    valor: 10,
    horarioFim: '12:00',
    horarioInicio: '11:00',
    idMateria: 1,
    idProfessor: 1,
    diaSemana: 1,
    indVoluntario: false,
  },
  {
    id: 2,
    valor: 10,
    horarioFim: '11:00',
    horarioInicio: '10:00',
    idMateria: 3,
    idProfessor: 1,
    diaSemana: 1,
    indVoluntario: false,
  },
  {
    id: 3,
    valor: 10,
    horarioFim: '9:00',
    horarioInicio: '8:00',
    idMateria: 2,
    idProfessor: 1,
    diaSemana: 1,
    indVoluntario: false,
  }] as ProfessorMateria[];

  constructor() { }

  incluir(professor: Professor): Observable<Professor> {
    professor.id = this.listaProfessores.length + 1;
    this.listaProfessores.push(professor);
    return of(professor);
  }

  alterar(professor: Professor): Observable<Professor> {
    const professorIndex = this.listaProfessores.findIndex(x => x.id === professor.id);
    this.listaProfessores[professorIndex] = { ...professor };
    return of(professor);
  }

  obter(parametro: { id: number }): Observable<Professor> {

    if (!parametro.id) {
      return of({} as Professor);
    }

    const professor = this.listaProfessores.find(x => x.id === parametro.id);
    return of(professor);
  }

  login(parametros: { email: string, senha: string }): Observable<Professor> {
    const professor = this.listaProfessores.find(x => x.email === parametros.email && x.senha === parametros.senha);
    return of(professor);
  }

  listarAgenda(parametro: { idProfessor: number, diaSemana: number }): Observable<ProfessorMateria[]> {
    const listaAgenda = this.listaAgenda.filter(x => x.idProfessor === parametro.idProfessor && x.diaSemana === parametro.diaSemana);
    return of(listaAgenda);
  }

  incluirAgenda(professorMateria: ProfessorMateria): Observable<ProfessorMateria> {

    const professorMateriaAgenda = { ...professorMateria };
    professorMateriaAgenda.id = this.listaAgenda.length + 1;
    this.listaAgenda.push(professorMateriaAgenda);
    return of(professorMateriaAgenda);
  }

  excluirAgenda(parametro: { id: number }): Observable<void> {

    const lista = this.listaAgenda.filter(x => x.id !== parametro.id);

    if (lista ?.length > 0) {
      this.listaAgenda = [...lista];
    } else {
      this.listaAgenda = [];
    }

    return of();
  }
}

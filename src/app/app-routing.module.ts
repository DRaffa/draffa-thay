import { ProfessorAulaComponent } from './professor/professor-aula/professor-aula.component';
import { ProfessorCadastroComponent } from './professor/professor-cadastro/professor-cadastro.component';
import { LoginComponent } from './login/login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'professor',
    children: [
      {
        path: 'aula/:id',
        component: ProfessorAulaComponent
      },
      {
        path: 'atualizar/:id',
        component: ProfessorCadastroComponent
      },
      {
        path: 'cadastro',
        component: ProfessorCadastroComponent
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  {
    path: '',
    component: PrincipalComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

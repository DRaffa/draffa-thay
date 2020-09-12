import { ProfessorService } from './../../services/professor.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  url = '';
  form = new FormGroup({});
  tipoLogin = '';

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
    private professorService: ProfessorService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [''],
      senha: ['']
    });

    this.tipoLogin = this.route.snapshot.parent.url[0].path;

    if (this.tipoLogin !== 'professor' && this.tipoLogin !== 'aluno') {
      this.router.navigateByUrl('/');
      return;
    }
  }

  entrar(): void {
    const email = this.form.controls.email.value;
    const senha = this.form.controls.senha.value;

    if (!email) {
      alert('E-mail em branco');
      return;
    }

    if (!senha) {
      alert('Senha em branco');
      return;
    }

    if (this.tipoLogin === 'professor') {

      this.professorService.login({ email, senha }).subscribe((professor) => {
        if (!professor || !professor.id) {
          alert('E-mail/ Senha inválidos');
          return;
        }

        this.router.navigateByUrl(`/professor/aula/${professor.id}`);
      },
        (erro) => {
          alert(erro.error);
        }
      );

    } else {
      this.router.navigateByUrl('/aluno/aula');
    }
  }

  enviarCadastro(): void {
    if (this.tipoLogin === 'professor') {
      this.router.navigateByUrl('/professor/cadastro');
    } else {
      this.router.navigateByUrl('/aluno/cadastro');
    }
  }

}

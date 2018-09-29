import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from "@angular/forms";

import { Usuario } from "../domain/usuario";
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { pipe } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  createForm() {
    this.formLogin = this.fb.group({
      email: [],
      senha: []
    });
  }

  sendForm() {
    const usuario = this.formLogin.value as Usuario;
    console.log(usuario);
    this.authService.login(usuario).pipe(take(1)).subscribe(r => {
      this.router.navigate(['/dashboard']);
    });
  }

  ngOnInit() {
    this.createForm();
  }

}

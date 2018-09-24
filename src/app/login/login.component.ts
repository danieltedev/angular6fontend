import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from "@angular/forms";

import { Usuario } from "../domain/usuario";
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  createForm() {
    this.formLogin = this.fb.group({
      email: [],
      senha: []
    });
  }

  sendForm() {
    const usuario = this.formLogin.value as Usuario;
    console.log(usuario);
    this.authService.login(usuario).subscribe(r => console.log(r));
  }

  ngOnInit() {
    this.createForm();
  }

}

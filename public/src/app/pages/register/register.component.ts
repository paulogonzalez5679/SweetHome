import { Component, OnInit, ElementRef } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { Router } from "@angular/router";
import { RegisterService } from "app/services/register/register.service";
import swal from "sweetalert2";
import { AuthService } from "app/services/auth/auth/auth.service";

declare var $: any;

declare interface UserRegister {
  primerNombre?: string;
  segundoNombre?: string;
  compania?: string;
  email?: string;
  password?: string;
  confirmacionPassword?: string;
}

@Component({
  moduleId: module.id,
  selector: "register-cmp",
  templateUrl: "./register.component.html",
  providers: [AuthService],
})
export class RegisterComponent implements OnInit {
  test: Date = new Date();
  public userRegister: UserRegister;
  registerForm = new FormGroup({
    primerNombre: new FormControl(""),
    segundoNombre: new FormControl(""),
    compania: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl(""),
    confirmacionPassword: new FormControl(""),
  });

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private registerService: RegisterService
  ) { }

  checkFullPageBackgroundImage() {
    var $page = $('.full-page');
    var image_src = $page.data('image');

    if (image_src !== undefined) {
      var image_container =
        '<div class="full-page-background" style="background-image: url(' +
        image_src +
        ') "/>';
      $page.append(image_container);
    }
  }

  ngOnInit() {
    this.userRegister = {};

    this.checkFullPageBackgroundImage();

    setTimeout(function () {
      // after 1000 ms we add the class animated to the login/register card
      $('.card').removeClass('card-hidden');
    }, 700);
  }

  /**
   * Con esta funcion se guarda los datos en la base de datos,
   * y en html debo form [formGroup]= "registerForm" (ngSubmit)= "save()">
   */
  async save() {
    this.registerService.registrarUsuario(this.registerForm.value);
  }

  async onRegister(userRegister, isValid) {
    var email = userRegister.email;
    var password = userRegister.password;
    if (isValid) {
      if (userRegister.confirmacionPassword == userRegister.password) {
        try {
          /// consumir el servicio para crear un usuario con email pass
          /// const user = await this.authSvc.register(email, password);
          /// *** si se crea el usuario registramos toda la data en la base de datos ***
          if (userRegister) {
            this.authSvc.register(email, password);

            this.registerService.registrarUsuario(userRegister);
            // this.router.navigate(['/home']);
          }
        } catch (error) {
        }
      } else {
        swal('Verifique las contraseñas', 'LAs contreseñas ingresadas no coinciden', 'error')
      }
    }





  }

}


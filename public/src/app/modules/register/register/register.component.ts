import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth/auth.service';
import { RegisterService } from '../../../services/register/register.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public userRegister: User;
  registerForm = new FormGroup({
    cell_phone: new FormControl(""),
    email: new FormControl(""),
    nombre: new FormControl(""),
    password: new FormControl(""),
  });

  constructor(
    private authSvc: AuthService,
    // private router: Router,
    private registerService: RegisterService
  ) { }

  ngOnInit(): void {
    this.userRegister = {
      cell_phone: '',
      email: '',
      login_type: 0,
      nombre: '',
      url_photo: '',
    };
  }

  /**
   * Con esta funcion se guarda los datos en la base de datos,
   * y en html debo form [formGroup]= "registerForm" (ngSubmit)= "save()">
   */
  async save() {
    this.registerService.registrarUsuario(this.registerForm.value);
  }

  async onRegister(userRegister: User, isValid) {
    var email = userRegister.email;
    var password = userRegister.password;
    if (isValid) {
      if (userRegister.confirPassword == userRegister.password) {
        try {
          /// consumir el servicio para crear un usuario con email pass
          /// const user = await this.authSvc.register(email, password);
          /// *** si se crea el usuario registramos toda la data en la base de datos ***
          if (userRegister) {
            var response = await this.authSvc.register(email, password);
            userRegister.id = response['uid'];
            this.registerService.registrarUsuario(userRegister);
            swal('Ok', 'Registro exitoso!', 'success')
            this.userRegister = {};
          }
        } catch (error) {
        }
      } else {
        swal('Verifique las contraseñas', 'Las contreseñas ingresadas no coinciden', 'error')
      }
    }





  }

}

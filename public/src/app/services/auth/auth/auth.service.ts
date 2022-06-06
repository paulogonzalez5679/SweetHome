import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "firebase";
import { first } from "rxjs/operators";
import swal from "sweetalert2";
import {Router} from '@angular/router'
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class AuthService {
  public user: User;

  constructor(public afAuth: AngularFireAuth,
    private router: Router,
    private fb: AngularFirestore
    ) {}

async getUserByEmail (uid: string) {
  return this.fb.collection('users_sale').doc(uid).valueChanges();
}

  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
     /* var user = (await this.getUserByEmail(result.user.uid)).subscribe((categorySnapshot) => {
        localStorage.setItem('infoUser', JSON.stringify(categorySnapshot));
        if (categorySnapshot['login_type'] == 2) {
          this.router.navigate(['/home'])
        } else if (categorySnapshot['login_type'] == 0) {
          this.router.navigate(['/categorias'])
        }
        
        return result;
      });*/
      this.router.navigate(['/categorias'])
    } catch (error) {
      if (error.code == "auth/wrong-password") {
        swal(
          "Atención",
          "La contraseña no es válida o el usuario no tiene una contraseña",
          "error"
        );
      }
      if (error.code == "auth/user-not-found") {
        swal(
          "Atención",
          "No hay registro de usuario correspondiente a este email. El usuario puede haber sido eliminado",
          "error"
        );
        // this.utilitiesService.showMessage('top', 'right', 4, "No hay registro de usuario correspondiente a este email. El usuario puede haber sido eliminado");
      }
      if (error.code == "auth/invalid-email") {
        swal("Atención", "El email no tiene un formato válido.", "error");

        // this.utilitiesService.showMessage('top', 'right', 4, "Demasiados intentos de inicio de sesión fallidos.");
      }
     
     
      if (error.code == "auth/too-many-requests") {
        swal(
          "Atención",
          "Demasiados intentos de inicio de sesión fallidos.",
          "error"
        );
      }
    }
  }
  async register(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      ).then((ok) => {
        return ok.user;
      })
      .catch ((error) => {
        if (error.code == "auth/user-not-found") {
          swal(
            "Atención",
            "No hay registro de usuario correspondiente a este email. El usuario puede haber sido eliminado",
            "error"
          );
        }
  
        if (error.code == "auth/email-already-in-use") {
          swal("Atención", "El email ingresado ya está en uso", "error");
        }
  
        if (error.code == "auth/wrong-password") {
          swal(
            "Atención",
            "La contraseña no es válida o el usuario no tiene una contraseña",
            "error"
          );
        }
  
        if (error.code == "auth/too-many-requests") {
          swal(
            "Atención",
            "Demasiados intentos de inicio de sesión fallidos.",
            "error"
          );
        }
        if (error.code == "auth/invalid-email") {
          swal("Atención", "El email no tiene un formato válido.", "error");
        }
      });
      return result;
    } catch (error) {
      if (error.code == "auth/user-not-found") {
        swal(
          "Atención",
          "No hay registro de usuario correspondiente a este email. El usuario puede haber sido eliminado",
          "error"
        );
      }

      if (error.code == "auth/email-already-in-use") {
        swal("Atención", "El email ingresado ya está en uso", "error");
      }
      if (error.code == "auth/wrong-password") {
        swal(
          "Atención",
          "La contraseña no es válida o el usuario no tiene una contraseña",
          "error"
        );
      }
      if (error.code == "auth/too-many-requests") {
        swal(
          "Atención",
          "Demasiados intentos de inicio de sesión fallidos.",
          "error"
        );
      }
      if (error.code == "auth/invalid-email") {
        swal("Atención", "El email no tiene un formato válido.", "error");
      }
    }
  }

  async logout(){
    await this.afAuth.signOut();
    this.router.navigate(['/pages/login'])
  }

  getCurrentUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }
}


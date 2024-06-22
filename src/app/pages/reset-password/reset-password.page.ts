// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { AutheticationService } from 'src/app/authetication.service';


// @Component({
//   selector: 'app-reset-password',
//   templateUrl: './reset-password.page.html',
//   styleUrls: ['./reset-password.page.scss'],
// })
// export class ResetPasswordPage implements OnInit {
//   email: any;

//   constructor(public route: Router, public authService: AutheticationService) {}

//   ngOnInit() {}

//   async resetPassword() {
//    this.authService.resetPassword(this.email).then(()=>{
//     console.log('link de redefinição enviado.')  
//     this.route.navigate(['/login'])
//     }
//       ).catch((error)=>{
//       console.log(error);
//       })
//     }
// }


import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  email: string;

  constructor(private afAuth: AngularFireAuth, private toastController: ToastController) {}

  async resetPassword() {
    if (!this.email) {
      const toast = await this.toastController.create({
        message: 'Por favor, entre com seu e-mail',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
      return;
    }

    try {
      await this.afAuth.sendPasswordResetEmail(this.email);
      const toast = await this.toastController.create({
        message: 'Um e-mail foi enviado com as instruções para redefinir sua senha.',
        duration: 2000,
        color: 'success'
      });
      await toast.present();
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'Ocorreu um erro ao tentar enviar o e-mail. Tente novamente mais tarde.',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
    }
  }
}

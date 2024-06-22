import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { AutheticationService } from 'src/app/authetication.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public authService: AutheticationService, // Corrigido o nome do serviço
    public route: Router,
    private toastController: ToastController
  ) {}







  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  togglePasswordVisibility() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.passwordIcon = 'eye';
    } else {
      this.passwordType = 'password';
      this.passwordIcon = 'eye-off';
    }
  }






  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'E-mail ou Senha inválidos',
      duration: 5000,
      position: position,
      color: 'danger',
    });

    await toast.present();
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")
        ],
        this.passwordValidator() // Corrigido o posicionamento do async validator
      ]
    });
  }

  passwordValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      const password: string = control.value;

      // Verifica se a senha atende aos critérios
      const hasDigit = /[0-9]/.test(password);
      const hasLowercase = /[a-z]/.test(password);
      const hasUppercase = /[A-Z]/.test(password);
      const hasMinLength = password.length >= 8;

      const valid = hasDigit && hasLowercase && hasUppercase && hasMinLength;

      // Retorna uma Promise ou Observable com o resultado da validação
      return valid ? of(null) : of({ 'invalidPassword': true });
    };
  }

  get errorControl() {
    return this.loginForm.controls;
  }

  async login() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if (this.loginForm?.valid) {
      const user = await this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).catch((error) => {
        console.log(error);
        loading.dismiss();
      });

      if (user) {
        loading.dismiss();
        this.route.navigate(['/tabs']);
      } else {
        this.presentToast('top')
        
      }
    }
  }
}



 
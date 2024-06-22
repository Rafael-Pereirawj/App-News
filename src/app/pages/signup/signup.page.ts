import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormsModule,
  ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AutheticationService } from 'src/app/authetication.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
   
  regForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder, 
    public loadingCtrl: LoadingController, 
    public authService: AutheticationService, 
    public router: Router
  ) { }





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





  ngOnInit() {
    this.regForm = this.formBuilder.group({
      fullname: ['', [Validators.required]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")
      ]]
    });
  }

  get errorControl() {
    return this.regForm.controls;
  }

  async signUp() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if(this.regForm?.valid){
      const user = await this.authService.registerUser(this.regForm.value.email,this.regForm.value.password).catch((error)=>{
        console.log(error);
        loading.dismiss()
      })

      if(user){
        loading.dismiss()
        this.router.navigate(['/login'])
      }else{
        console.log('Email ou Senha invalido')
      }
    }
  }



}
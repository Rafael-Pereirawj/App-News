// import { Injectable } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import firebase from 'firebase/compat/app';

// @Injectable({
//   providedIn: 'root'
// })
// export class AutheticationService {
  
//   constructor(public ngFireAuth: AngularFireAuth) { }

//   async registerUser(email: string, password: string) {
//     return await this.ngFireAuth.createUserWithEmailAndPassword(email, password);
//   }

//   async loginUser(email: string, password: string) {
//     return await this.ngFireAuth.signInWithEmailAndPassword(email, password);
//   }

//   async resetPassword(email: string) {
//     try {
//       console.log('Email fornecido:', email); // Adicionando um log para o email fornecido
//       // Verificar se o email existe no Firebase
//       const methods = await this.ngFireAuth.fetchSignInMethodsForEmail(email);
//       console.log('Métodos de login associados:', methods); // Adicionando um log para os métodos de login associados ao email
//       if (methods && methods.length > 0) {
//         // Se o email existe, enviar o link de redefinição de senha
//         return await this.ngFireAuth.sendPasswordResetEmail(email);
//       } else {
//         // Se o email não existe, lançar um erro
//         throw new Error('O email não está registrado. Verifique o endereço de email.');
//       }
//     } catch (error) {
//       console.error('Erro ao redefinir a senha:', error); // Adicionando um log para o erro
//       throw error; // Lançar o erro para que ele possa ser tratado no componente
//     }
//   }




//   async signOut() {
//     return await this.ngFireAuth.signOut();
//   }

//   async getProfile() {
//     return await this.ngFireAuth.currentUser;
//   }
// }

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AutheticationService {
  
  constructor(public ngFireAuth: AngularFireAuth) { }

  async registerUser(email: string, password: string) {
    return await this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }

  async loginUser(email: string, password: string) {
    return await this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  async resetPassword(email: string) {
    try {
      console.log('Email fornecido:', email); // Adicionando um log para o email fornecido
      // Verificar se o email existe no Firebase
      const methods = await this.ngFireAuth.fetchSignInMethodsForEmail(email);
      console.log('Métodos de login associados:', methods); // Adicionando um log para os métodos de login associados ao email
      if (methods && methods.length > 0) {
        // Se o email existe, enviar o link de redefinição de senha
        return await this.ngFireAuth.sendPasswordResetEmail(email);
      } else {
        // Se o email não existe, lançar um erro
        throw new Error('O email não está registrado. Verifique o endereço de email.');
      }
    } catch (error) {
      console.error('Erro ao redefinir a senha:', error); // Adicionando um log para o erro
      throw error; // Lançar o erro para que ele possa ser tratado no componente
    }
  }




  async signOut() {
    return await this.ngFireAuth.signOut();
  }

  async getProfile() {
    return await this.ngFireAuth.currentUser;
  }
}
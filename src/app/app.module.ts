import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiService } from './services/api.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, HttpClientModule,
    AngularFireModule, AngularFireAuthModule, AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}

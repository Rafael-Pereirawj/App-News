import { Component } from '@angular/core';
import { AutheticationService } from '../authetication.service';
import { Router } from '@angular/router';
import { getName } from 'ionicons/dist/types/components/icon/utils';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  user: any
  constructor(public route:Router, public authService:AutheticationService) {
    this.user = authService.getProfile()
  }
  
  async logout(){
    this.authService.signOut().then(()=>{
      this.route.navigate(['/landing'])
    }).catch((error)=>{
      console.log(error);
    })
  }

}

import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { BejelentkezesService } from '../bejelentkezes.service';

@Component({
  selector: 'app-email-ellenorzo-szerkesztes',
  standalone: false,
  templateUrl: './email-ellenorzo-szerkesztes.component.html',
  styleUrl: './email-ellenorzo-szerkesztes.component.css'
})
export class EmailEllenorzoSzerkesztesComponent {
  kod:string|number=0;
  constructor(private loginService:LoginService,private router:Router,private bejelentkezettService:BejelentkezesService){}
  Kuldes(){
    if(this.kod==this.loginService.kod){
      this.bejelentkezettService.updateFiokById(this.loginService.Fiok()).subscribe(()=>{
        this.bejelentkezettService.changeId();
        this.router.navigate(["/"]);
      });
    }
  }
}

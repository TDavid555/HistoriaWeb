import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { BejelentkezesService } from '../bejelentkezes.service';

@Component({
  selector: 'app-email-ellenorzo',
  standalone: false,
  templateUrl: './email-ellenorzo.component.html',
  styleUrl: './email-ellenorzo.component.css'
})
export class EmailEllenorzoComponent{
  kod:string|number=0;
  constructor(private loginService:LoginService,private router:Router,private bejelentkezesService:BejelentkezesService){}
  Kuldes(){
    if(this.kod==this.loginService.kod){
      this.loginService.addFiok().subscribe(fiok=>{
        localStorage.setItem("id",fiok.id);
        this.bejelentkezesService.changeId();
        this.router.navigate(["/"]);
      });
    }
  }
}

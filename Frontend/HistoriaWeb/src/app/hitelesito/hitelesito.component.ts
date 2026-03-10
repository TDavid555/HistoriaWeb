import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { BejelentkezesService } from '../bejelentkezes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hitelesito',
  standalone: false,
  templateUrl: './hitelesito.component.html',
  styleUrls: ['./hitelesito.component.css']
})
export class HitelesitoComponent {
  bejelentkezes=true;
  private felhasznalonev:any[]=[];
  private jelszo_pattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,}$/;
  private email_pattern=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  fiok:any={felhasznalonev:"",email:"",jelszo:"",jelszo_i:""}
  constructor(private loginService:LoginService,private bejelentkezesService:BejelentkezesService,private router:Router){}
  
  Be():void{
    this.bejelentkezes=true;
    document.getElementById("be").classList.add("active");
    document.getElementById("ki").classList.remove("active");
  }

  Ki():void{
    this.bejelentkezes=false;
    document.getElementById("be").classList.remove("active");
    document.getElementById("ki").classList.add("active");
  }

  Mutat(id1:string,id2:string):void{
    let jelszo=document.getElementById(id1);
    let szem=document.getElementById(id2);
    if(jelszo.getAttribute("type")=="password"){
      jelszo.setAttribute("type","text");
      szem.classList.replace("bi-eye-fill","bi-eye-slash-fill");
    }
    else{
      jelszo.setAttribute("type","password");
      szem.classList.replace("bi-eye-slash-fill","bi-eye-fill");
    }
  }

  Ellenorzes():void{
    this.loginService.getFelhasznalonev(this.fiok.felhasznalonev).subscribe(felhasznalo=>{
      this.felhasznalonev=felhasznalo;
      this.Kuldes()
    });
  }
  Kuldes():void{
    if(this.bejelentkezes){
      this.loginService.getFiok(this.fiok).subscribe(talalat=>{
        if(talalat==null){
          document.getElementById("felhasznalonev").classList.remove("is-valid");
          document.getElementById("felhasznalonev").classList.add("is-invalid");
          document.getElementById("jelszo").classList.remove("is-valid");
          document.getElementById("jelszo").classList.add("is-invalid");
        }
        else{
          document.getElementById("felhasznalonev").classList.remove("is-invalid");
          document.getElementById("felhasznalonev").classList.add("is-valid");
          document.getElementById("jelszo").classList.remove("is-invalid");
          document.getElementById("jelszo").classList.add("is-valid");
          localStorage.setItem("id",talalat.id);
          this.bejelentkezesService.changeId();
          this.router.navigate(["/"]);
        }
      });
    }
    else{
      if(!this.jelszo_pattern.test(this.fiok.jelszo)){
        document.getElementById("jelszo").classList.remove("is-valid");
        document.getElementById("jelszo").classList.add("is-invalid");
      }
      else{
        document.getElementById("jelszo").classList.remove("is-invalid");
        document.getElementById("jelszo").classList.add("is-valid");
      }
      if(this.fiok.jelszo_i!=this.fiok.jelszo || !this.jelszo_pattern.test(this.fiok.jelszo_i)){
        document.getElementById("jelszo_i").classList.remove("is-valid");
        document.getElementById("jelszo_i").classList.add("is-invalid");
      }
      else{
        document.getElementById("jelszo_i").classList.remove("is-invalid");
        document.getElementById("jelszo_i").classList.add("is-valid");
      }

      if(this.fiok.felhasznalonev.trim()=="" || this.felhasznalonev.length!=0){
        document.getElementById("felhasznalonev").classList.remove("is-valid");
        document.getElementById("felhasznalonev").classList.add("is-invalid");
      }
      else{
        document.getElementById("felhasznalonev").classList.remove("is-invalid");
        document.getElementById("felhasznalonev").classList.add("is-valid");
      }

      if(!this.email_pattern.test(this.fiok.email)){
        document.getElementById("email").classList.remove("is-valid");
        document.getElementById("email").classList.add("is-invalid");
      }
      else{
        document.getElementById("email").classList.remove("is-invalid");
        document.getElementById("email").classList.add("is-valid");
      }
      if(this.jelszo_pattern.test(this.fiok.jelszo) && this.fiok.jelszo_i==this.fiok.jelszo && this.fiok.felhasznalonev.trim()!="" && this.felhasznalonev.length==0 && this.email_pattern.test(this.fiok.email)){
        this.loginService.Kod_kuldes(this.fiok).subscribe(()=>{
          this.router.navigate(["/ellenorzes"]);
        });
      }
    }
  }
}

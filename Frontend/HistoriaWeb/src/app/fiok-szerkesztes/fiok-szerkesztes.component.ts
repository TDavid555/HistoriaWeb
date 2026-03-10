import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BejelentkezesService } from '../bejelentkezes.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-fiok-szerkesztes',
  standalone: false,
  templateUrl: './fiok-szerkesztes.component.html',
  styleUrl: './fiok-szerkesztes.component.css'
})
export class FiokSzerkesztesComponent implements OnInit{
  fiok:any={felhasznalonev:"",email:"",jelszo:"",kituntetes:""};
  private felhasznalonev:any[]=[];
  private felhasznalo:string="";
  private jelszo_pattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
  private email_pattern=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  tortenetek:any[]=[];
  id:number=0;
  constructor(private bejelentkezettService:BejelentkezesService,private router:Router,private loginService:LoginService){}
  
  ngOnInit(): void {
      this.bejelentkezettService.getFiokById().subscribe(fiok=>
      {
        this.fiok=fiok;
        this.fiok.jelszo_i=fiok.jelszo;
        this.felhasznalo=fiok.felhasznalonev;
      });
      this.bejelentkezettService.getTortenetByFiokId().subscribe(tortenetek=>{
        this.tortenetek=tortenetek;
        if(tortenetek.length!=0){
          this.id=tortenetek[0].id;
        }
      });
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
      this.Frissites()
    });
  }

  Frissites():void{
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

    if(this.fiok.felhasznalonev.trim()=="" || (this.felhasznalonev.length!=0 && this.felhasznalo!=this.fiok.felhasznalonev)){
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
    if(this.jelszo_pattern.test(this.fiok.jelszo) && this.fiok.jelszo_i==this.fiok.jelszo && this.fiok.felhasznalonev.trim()!="" && (this.felhasznalonev.length==0 || this.felhasznalo==this.fiok.felhasznalonev) && this.email_pattern.test(this.fiok.email)){
      this.loginService.Kod_kuldes(this.fiok).subscribe(()=>{
        this.router.navigate(["/ellenorzo_szerkesztes"]);
      });
    }
  }
  Torles():void{
    this.bejelentkezettService.deleteFiokById().subscribe(()=>{
      localStorage.removeItem("id");
      this.bejelentkezettService.changeId();
      this.router.navigate(["/hitelesito"]);
    });
  }
  Van():boolean{
    return this.tortenetek.length==0;
  }
  Valasztas(id:number):void{
    this.id=id;
  }
}

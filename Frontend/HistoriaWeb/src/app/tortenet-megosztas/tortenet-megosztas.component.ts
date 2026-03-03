import { Component, OnInit } from '@angular/core';
import { BejelentkezesService } from '../bejelentkezes.service';
import { TelepulesekService } from '../telepulesek.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tortenet-megosztas',
  standalone: false,
  templateUrl: './tortenet-megosztas.component.html',
  styleUrls: ['./tortenet-megosztas.component.css']
})
export class TortenetMegosztasComponent implements OnInit{
  tortenet:any={cim:"",tortenet:"",tortenet_datum_kezdet:new Date().toLocaleDateString("en-CA"),kep_url:"",tortenet_datum_vege:new Date().toLocaleDateString("en-CA"),telepulesek:[]};
  private adatok=new FormData();
  megyek:any[]=[];
  telepulesek:any[]=[];
  valasztot_megyek:string[]=[];
  private van_cim:boolean=false;
  constructor(private telepulesekService:TelepulesekService,private bejelentkezesService:BejelentkezesService,private router:Router){}
  ngOnInit(): void {
    this.telepulesekService.getMegyek().subscribe(megyek=>{
      this.megyek=megyek;
    });
  }
  
  Telepulesek():void{
    this.telepulesek=[];
    this.tortenet.telepulesek=[];
    this.valasztot_megyek.forEach(megye=>{
      this.telepulesekService.getTelepulesekByMegye(megye).subscribe(telepulesek=>{
        this.telepulesek=this.telepulesek.concat(telepulesek);
      });
    });
  }

  Torles(id:string):void{
    document.getElementById(id).classList.remove("is-valid");
    document.getElementById(id).classList.remove("is-invalid");
  }
  Kivalasztas(event):void{
    this.adatok.append("kepek",event.target.files[0]);
    this.tortenet.kep_url=event.target.files[0].name;
  }

  Nincs():void{
    this.tortenet.kep_url="";
  }

  Ellenorzes():void{
    if(this.tortenet.cim.trim()!=""){
      this.bejelentkezesService.getTortenetByCimFiokId(this.tortenet.cim.trim()).subscribe(tortenetek=>{
        this.van_cim=tortenetek.length==0;
        this.Kuldes();
      });
    }
    else{
      this.Kuldes();
    }
  }

  Validalas(feltetel:boolean,id:string):boolean{
    if(feltetel){
      document.getElementById(id).classList.remove("is-invalid");
      document.getElementById(id).classList.add("is-valid");
      return feltetel
    }
    document.getElementById(id).classList.remove("is-valid");
    document.getElementById(id).classList.add("is-invalid");
    return feltetel;
  }

  Kuldes():void{
    let kep_pattern=/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
    let jo_megye:boolean=this.Validalas(this.valasztot_megyek.length!=0,"megye");
    let jo_telepules:boolean=this.Validalas(this.tortenet.telepulesek.length!=0,"telepules");
    let jo_datum_vege:boolean=this.Validalas(!isNaN(Date.parse(this.tortenet.tortenet_datum_vege)) && Date.parse(this.tortenet.tortenet_datum_vege)-Date.parse(this.tortenet.tortenet_datum_kezdet)>=0 && Date.parse(new Date().toLocaleDateString("en-CA"))-Date.parse(this.tortenet.tortenet_datum_vege)>=0,"tortenet_vege");
    let jo_datum_kezdet:boolean=this.Validalas(!isNaN(Date.parse(this.tortenet.tortenet_datum_kezdet)) && Date.parse(this.tortenet.tortenet_datum_vege)-Date.parse(this.tortenet.tortenet_datum_kezdet)>=0,"tortenet_kezdet");
    let jo_cim:boolean=this.Validalas(this.tortenet.cim.trim()!="" && this.tortenet.cim.trim().length<100 && this.van_cim,"cim");
    let jo_tortenet:boolean=this.Validalas(this.tortenet.tortenet.trim()!="","tortenet");
    let jo_fajl:boolean=this.Validalas(kep_pattern.test(this.tortenet.kep_url) || this.tortenet.kep_url.trim()=="","kep_url");
    if(jo_megye && jo_telepules && jo_datum_vege && jo_datum_kezdet && jo_cim && jo_tortenet && jo_fajl){
      Object.entries(this.tortenet).forEach(i=>{
        this.adatok.set(i[0],i[1].toString());
      });
      this.bejelentkezesService.addTortenet(this.adatok).subscribe(adat=>{
        this.router.navigate([`/tortenetek/${this.tortenet.telepulesek[0]}/${adat.id}`]);
      });
    }
  }

}
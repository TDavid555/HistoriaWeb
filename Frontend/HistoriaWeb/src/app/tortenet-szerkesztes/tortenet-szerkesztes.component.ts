import { Component, OnInit } from '@angular/core';
import { TelepulesekService } from '../telepulesek.service';
import { BejelentkezesService } from '../bejelentkezes.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TortenetekService } from '../tortenetek.service';

@Component({
  selector: 'app-tortenet-szerkesztes',
  standalone: false,
  templateUrl: './tortenet-szerkesztes.component.html',
  styleUrl: './tortenet-szerkesztes.component.css'
})
export class TortenetSzerkesztesComponent implements OnInit {
  tortenet:any={id:0,cim:"",tortenet:"",tortenet_datum_kezdet:"",tortenet_datum_vege:"",kep_url:"",telepulesek:[]};
  megyek:any[]=[];
  telepulesek:any[]=[];
  valasztot_megyek:string[]=[];
  private van_cim:boolean=false;
  private cim="";
  private adatok=new FormData();
  constructor(private telepulesekService:TelepulesekService,private bejelentkezesService:BejelentkezesService,private router:Router,private route:ActivatedRoute,private tortenetekService:TortenetekService){}
  
  ngOnInit(): void {
    this.telepulesekService.getMegyek().subscribe(megyek=>{
      this.megyek=megyek;
    });
    this.tortenetekService.getTortenetByTortenetId(parseInt(this.route.snapshot.paramMap.get("id"))).subscribe(tortenet=>{
      tortenet.tortenet_datum_vege=new Date(tortenet.tortenet_datum_vege).toLocaleDateString("en-CA");
      tortenet.tortenet_datum_kezdet=new Date(tortenet.tortenet_datum_kezdet).toLocaleDateString("en-CA");
      tortenet.megyek=tortenet.megyek.split(",");
      this.valasztot_megyek=tortenet.megyek;
      this.Telepulesek();
      tortenet.telepulesek=tortenet.telepulesek.split(",");
      this.tortenet.id=tortenet.id;
      this.tortenet.telepulesek=tortenet.telepulesek;
      this.tortenet.tortenet_datum_kezdet=tortenet.tortenet_datum_kezdet;
      this.tortenet.tortenet_datum_vege=tortenet.tortenet_datum_vege;
      this.tortenet.cim=tortenet.cim;
      this.tortenet.tortenet=tortenet.tortenet;
      this.tortenet.kep_url=tortenet.kep_url;
      this.cim=tortenet.cim;
    })
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

  Torles():void{
    this.tortenetekService.deleteTortenetByTortenetId(parseInt(this.route.snapshot.paramMap.get("id"))).subscribe(()=>{
      this.router.navigate(["/fiok_szerkesztes"]);
    })
  }

  Ellenorzes():void{
    if(this.tortenet.cim.trim()!=""){
      this.bejelentkezesService.getTortenetByCimFiokId(this.tortenet.cim.trim()).subscribe(tortenetek=>{
        this.van_cim=tortenetek.length!=0;
        this.Kuldes();
      });
    }
    else{
      this.Kuldes();
    }
  }

  Valasztas(id:string):void{
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
      this.bejelentkezesService.updateTortenetByTortenetId(this.adatok,this.tortenet.id).subscribe(()=>{
        this.router.navigate([`/tortenetek/${this.tortenet.telepulesek[0]}/${this.tortenet.id}`]);
      });
    }
  }
}

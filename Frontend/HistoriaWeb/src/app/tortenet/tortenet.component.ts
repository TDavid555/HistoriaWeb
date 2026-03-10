import { Component, OnInit } from '@angular/core';
import { TortenetekService } from '../tortenetek.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tortenet',
  standalone: false,
  templateUrl: './tortenet.component.html',
  styleUrls: ['./tortenet.component.css']
})
export class TortenetComponent implements OnInit {
  tortenet:any={};
  hozzaszolas:string="";
  private id=localStorage.getItem("id");
  private like=true;
  constructor(private tortenetekService:TortenetekService,private router:ActivatedRoute){}
  ngOnInit(): void {
    this.getLike();
  }

  Tortenet():void{
    this.tortenetekService.getTortenetByTortenetId(parseInt(this.router.snapshot.paramMap.get("id"))).subscribe(tortenet=>{
      tortenet.tortenet_datum_kezdet=new Date(tortenet.tortenet_datum_kezdet).toLocaleDateString();
      tortenet.tortenet_datum_vege=new Date(tortenet.tortenet_datum_vege).toLocaleDateString();
      tortenet.keletkezes_datum=new Date(tortenet.keletkezes_datum).toLocaleString();
      if(tortenet.hozzaszolasok){
        tortenet.hozzaszolasok=tortenet.hozzaszolasok.split("\n").map(i=>{
          const sor=i.split(":");
          return {id:parseInt(sor[0]),felhasznalonev:sor[1],hozzaszolas:sor[2],fiok_id:sor[3]};
        });
      }
      this.tortenet=tortenet;
    });
  }

  Hozzaszolas(id:string):boolean{
    return localStorage.getItem("id")!=id;
  }

  Kuldes():void{
    this.tortenetekService.addHozzaszolas(this.hozzaszolas,parseInt(this.router.snapshot.paramMap.get("id")),parseInt(this.id)).subscribe(()=>{
      this.Tortenet();
    });
  }

  getLike():void{
    this.tortenetekService.getLike(parseInt(this.router.snapshot.paramMap.get("id")),parseInt(this.id)).subscribe(eredmeny=>{
      if(this.id!=null){
        if(eredmeny!=null){
          if(eredmeny.tetszik){
            document.getElementById("dislike").classList.remove("bi-hand-thumbs-down-fill");
            document.getElementById("dislike").classList.add("bi-hand-thumbs-down");
            document.getElementById("like").classList.remove("bi-hand-thumbs-up");
            document.getElementById("like").classList.add("bi-hand-thumbs-up-fill");
            this.like=true;
          }
          else{
            this.like=false;
            document.getElementById("like").classList.remove("bi-hand-thumbs-up-fill");
            document.getElementById("like").classList.add("bi-hand-thumbs-up");
            document.getElementById("dislike").classList.remove("bi-hand-thumbs-down");
            document.getElementById("dislike").classList.add("bi-hand-thumbs-down-fill");
          }
        }
        else{
          document.getElementById("like").classList.remove("bi-hand-thumbs-up-fill");
          document.getElementById("like").classList.add("bi-hand-thumbs-up");
          document.getElementById("dislike").classList.remove("bi-hand-thumbs-down-fill");
          document.getElementById("dislike").classList.add("bi-hand-thumbs-down");
        }
      }
    });
    this.Tortenet();
  }

  Like():void{
    this.like=true;
    const like={tortenet_id:parseInt(this.router.snapshot.paramMap.get("id")),fiok_id:parseInt(this.id),tetszik:this.like}
    const van=Array.from(document.getElementById("like").classList);
    if(van.includes("bi-hand-thumbs-up-fill")){
      like.tetszik=false;
      this.tortenetekService.deleteLike(like.tortenet_id,like.fiok_id).subscribe(()=>{
        this.getLike();
      });
    }
    else{
      this.tortenetekService.updateLike(like).subscribe(()=>{
        this.getLike();
      })
      this.tortenetekService.addLike(like).subscribe(()=>{
        this.getLike();
      })
    }
  }

  Dislike():void{
    this.like=false;
    const like={tortenet_id:parseInt(this.router.snapshot.paramMap.get("id")),fiok_id:parseInt(this.id),tetszik:this.like}
    const van=Array.from(document.getElementById("dislike").classList);
    if(van.includes("bi-hand-thumbs-down-fill")){
      like.tetszik=true;
      this.tortenetekService.deleteLike(like.tortenet_id,like.fiok_id).subscribe(()=>{
        this.getLike();
      });
    }
    else{
      this.tortenetekService.updateLike(like).subscribe(()=>{
        this.getLike();
      })
      this.tortenetekService.addLike(like).subscribe(()=>{
        this.getLike();
      })
    }
  }

  Van():boolean{
    return localStorage.getItem("id")==undefined;
  }

  Torles(id:number){
    this.tortenetekService.deleteHozzaszolas(id).subscribe(()=>{
      this.Tortenet();
    });
  }


}

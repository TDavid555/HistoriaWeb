import { Component, OnInit} from '@angular/core';
import { TerkepService } from '../terkep.service';
import { TortenetekService } from '../tortenetek.service';

@Component({
  selector: 'app-fooldal',
  standalone: false,
  templateUrl: './fooldal.component.html',
  styleUrl: './fooldal.component.css',
})

export class FooldalComponent implements OnInit{
  terkep:any[]=[];
  legutobbi_tortenetek:any[]=[];
  legjobban_kedvelt_tortenetek:any[]=[];
  constructor(private terkepService:TerkepService,private tortenetekService:TortenetekService){}

  ngOnInit(): void {
      this.getTerkep();
      this.getLegjobbanKedveltTortenetek();
      this.getLegutobbiTortenetek();
  }

  getTerkep():void{
    this.terkepService.getTerkep().subscribe(helyek=>{
      this.terkep=helyek.map(pont=>{
        return {x:1020*(pont.longitude-15.97)/6.97,y:675*(48.76-pont.latitude)/3.09,telepules:pont.telepules}
      });
    });
  }

  getLegjobbanKedveltTortenetek():void{
    this.tortenetekService.getTortenetekOrderByLikes().subscribe(tortenetek=>{
      this.legjobban_kedvelt_tortenetek=tortenetek.map(i=>{
        i.tortenet=i.tortenet.split(" ").slice(0,20).join(" ")
        return i;
      });
    })
  }

  getLegutobbiTortenetek():void{
    this.tortenetekService.getTortenetekOrderByDate().subscribe(tortenetek=>{
      this.legutobbi_tortenetek=tortenetek.map(i=>{
        i.tortenet=i.tortenet.split(" ").slice(0,20).join(" ")
        return i;
      });
    })
  }
}

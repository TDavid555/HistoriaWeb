import { Component, OnInit } from '@angular/core';
import { TortenetekService } from '../tortenetek.service';

@Component({
  selector: 'app-rangsor',
  standalone: false,
  templateUrl: './rangsor.component.html',
  styleUrl: './rangsor.component.css'
})
export class RangsorComponent implements OnInit{
  rangsor:any[]=[];
  constructor(private tortenetekService:TortenetekService){}
  ngOnInit(): void {
    this.tortenetekService.getRangsor().subscribe(adatok=>{
      this.rangsor=adatok.map((i,j)=>{
        i.helyezes=j+1;
        return i;
      });
    });
  }
}

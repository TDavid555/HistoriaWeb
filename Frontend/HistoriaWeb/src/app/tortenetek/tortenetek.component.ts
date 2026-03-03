import { Component} from '@angular/core';
import { TortenetekService } from '../tortenetek.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tortenetek',
  templateUrl: './tortenetek.component.html',
  styleUrls: ['./tortenetek.component.css'],
  standalone: false
})
export class TortenetekComponent {
  tortenetek:any[]=[];
  telepules="";
  constructor(private tortenetekService:TortenetekService,private router:ActivatedRoute){}
  ngOnInit(): void {
    this.telepules=this.router.snapshot.paramMap.get("telepules");
    this.tortenetekService.getTortenetekByTelepules(this.telepules).subscribe(tortenetek=>{
      this.tortenetek=tortenetek.map(i=>{
        i.keletkezes_datum=new Date(i.keletkezes_datum).toLocaleDateString()
        return i;
      });
    });
  }
}

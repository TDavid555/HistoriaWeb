import { Component, OnInit } from '@angular/core';
import { TortenetekService } from '../tortenetek.service';
import { TelepulesekService } from '../telepulesek.service';

@Component({
  selector: 'app-osszes-tortenet',
  templateUrl: './osszes-tortenet.component.html',
  styleUrls: ['./osszes-tortenet.component.css'],
  standalone: false
})
export class OsszesTortenetComponent implements OnInit {
  tortenetek: any[] = [];
  osszes_tortenet: any[] = [];
  megyek: any[] = [];
  telepulesek: any[] = [];
  valasztott_megye: string = '';
  valasztott_telepules: string = '';

  constructor(
    private tortenetekService: TortenetekService,
    private telepulesekService: TelepulesekService
  ) {}

  ngOnInit(): void {    
    this.telepulesekService.getMegyek().subscribe(megyek=>{
      this.megyek = megyek;
    });

    this.tortenetekService.getOsszesTortenetek().subscribe(tortenetek=>{
        this.osszes_tortenet = tortenetek.map(i => {
          i.keletkezes_datum = new Date(i.keletkezes_datum).toLocaleDateString();
          i.tortenet=i.tortenet.split(" ").slice(0,20).join(" ")
          return i;
        });
        this.tortenetek = [...this.osszes_tortenet];
    });
  }

  onMegyeChange(): void {
    this.telepulesek = [];
    this.valasztott_telepules = '';
    
    if (this.valasztott_megye) {
      this.telepulesekService.getTelepulesekByMegye(this.valasztott_megye).subscribe(telepulesek=>{
          this.telepulesek = telepulesek;
      });
    }
  }

  kereses(): void {    
    if (this.valasztott_telepules) {
      this.tortenetek = this.osszes_tortenet.filter(t => 
        t.telepules === this.valasztott_telepules
      );
    } 
    else {
      this.tortenetek = [...this.osszes_tortenet];
    }
  }

  szurestTorlese(): void {
    this.valasztott_megye = '';
    this.valasztott_telepules = '';
    this.telepulesek = [];
    this.tortenetek = [...this.osszes_tortenet];
  }
}

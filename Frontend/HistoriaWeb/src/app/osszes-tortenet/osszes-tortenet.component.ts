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
    console.log('OsszesTortenetComponent inicializálva');
    
    this.telepulesekService.getMegyek().subscribe({
      next: (megyek) => {
        this.megyek = megyek;
        console.log('Megyék betöltve:', this.megyek.length, 'db');
        console.log('Megyék:', megyek);
      },
      error: (err) => {
        console.error('Hiba a megyék betöltésekor:', err);
      }
    });

    this.tortenetekService.getOsszesTortenetek().subscribe({
      next: (tortenetek) => {
        console.log('Történetek betöltve:', tortenetek.length, 'db');
        this.osszes_tortenet = tortenetek.map(i => {
          i.keletkezes_datum = new Date(i.keletkezes_datum).toLocaleDateString();
          i.tortenet=i.tortenet.split(" ").slice(0,20).join(" ")
          return i;
        });
        this.tortenetek = [...this.osszes_tortenet];
        console.log('Feldolgozott történetek:', this.tortenetek.length, 'db');
      },
      error: (err) => {
        console.error('Hiba a történetek betöltésekor:', err);
      }
    });
  }

  onMegyeChange(): void {
    console.log('Megye választva:', this.valasztott_megye);
    this.telepulesek = [];
    this.valasztott_telepules = '';
    
    if (this.valasztott_megye) {
      this.telepulesekService.getTelepulesekByMegye(this.valasztott_megye).subscribe({
        next: (telepulesek) => {
          this.telepulesek = telepulesek;
          console.log('Települések betöltve:', this.telepulesek.length, 'db');
        },
        error: (err) => {
          console.error('Hiba a települések betöltésekor:', err);
        }
      });
    }
  }

  kereses(): void {
    console.log('Keresés indítva. Választott település:', this.valasztott_telepules);
    
    if (this.valasztott_telepules) {
      this.tortenetek = this.osszes_tortenet.filter(t => 
        t.telepules === this.valasztott_telepules
      );
      console.log('Szűrt történetek:', this.tortenetek.length, 'db');
    } else {
      this.tortenetek = [...this.osszes_tortenet];
      console.log('Összes történet megjelenítve:', this.tortenetek.length, 'db');
    }
  }

  szurestTorlese(): void {
    console.log('Szűrés törlése');
    this.valasztott_megye = '';
    this.valasztott_telepules = '';
    this.telepulesek = [];
    this.tortenetek = [...this.osszes_tortenet];
    console.log('Szűrés törölve, összes történet:', this.tortenetek.length, 'db');
  }
}

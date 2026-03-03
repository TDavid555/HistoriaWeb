import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BejelentkezesService } from '../bejelentkezes.service';
@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  fiok:any=null;
  constructor(private bejelentkezesService:BejelentkezesService,private router:Router){}

  ngOnInit(): void {
    this.bejelentkezesService.Id.subscribe(()=>{
      this.bejelentkezesService.getFiokById().subscribe(fiok=>{
        this.fiok=fiok;
      });
    });
  }

  Kijelentkezes(): void {
    localStorage.removeItem("id");
    this.bejelentkezesService.changeId();
    this.fiok=null;
    this.router.navigate(["/hitelesito"]);
  }
}

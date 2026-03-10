import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private api:string="http://localhost:3000/api";
  kod:string="";
  private fiok:any;
  constructor(private http:HttpClient) { }
  Kod_kuldes(fiok:any):Observable<any>{
    let kod="";
    for(let i=0;i<3;i++){
      kod+=Math.floor(Math.random()*10);
    }
    this.kod=kod;
    fiok.kod=kod;
    this.fiok=fiok;
    return this.http.post(`${this.api}/ellenorzes`,fiok);
  }
  Fiok():any{
    return this.fiok;
  }
  addFiok():Observable<any>{
    return this.http.post(`${this.api}/fiokok`,this.fiok);
  }
  getFiok(fiok:any):Observable<any>{
    return this.http.get(`${this.api}/fiokok`,{params:fiok});
  }
  getFelhasznalonev(felhasznalonev:string):Observable<any>{
    return this.http.get(`${this.api}/felhasznalonev/${felhasznalonev}`);
  }
}

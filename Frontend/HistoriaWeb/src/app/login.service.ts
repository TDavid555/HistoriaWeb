import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private api="http://localhost:3000/api"
  constructor(private http:HttpClient) { }
  addFiok(fiok:any):Observable<any>{
    return this.http.post(`${this.api}/fiokok`,fiok);
  }
  getFiok(fiok:any):Observable<any>{
    return this.http.get(`${this.api}/fiokok`,{params:fiok});
  }
  getFelhasznalonev(felhasznalonev:string):Observable<any>{
    return this.http.get(`${this.api}/felhasznalonev/${felhasznalonev}`);
  }
}

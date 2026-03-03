import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TelepulesekService {
  private api="http://localhost:3000/api"
  constructor(private http:HttpClient) { }
  getMegyek():Observable<any>{
    return this.http.get(`${this.api}/megyek`);
  }
  getTelepulesekByMegye(megye:string):Observable<any>{
    return this.http.get(`${this.api}/telepulesek/${megye}`);
  }
  getMegyeByTelepules(telepules:string):Observable<any>{
    return this.http.get(`${this.api}/megyek/${telepules}`);
  }
}

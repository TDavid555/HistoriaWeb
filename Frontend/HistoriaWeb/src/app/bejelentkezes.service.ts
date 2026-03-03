import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BejelentkezesService {
  private api="http://localhost:3000/api";
  private id = new BehaviorSubject<string>(localStorage.getItem("id"));
  Id=this.id.asObservable();
  constructor(private http:HttpClient) { }

  changeId(){
    this.id.next(localStorage.getItem("id"));
  }

  getFiokById():Observable<any>{
    return this.http.get(`${this.api}/fiokok/${this.id.getValue()}`);
  }

  getTortenetByFiokId():Observable<any>{
    return this.http.get(`${this.api}/tortenetek/${this.id.getValue()}`);
  }

  getTortenetByCimFiokId(cim:string):Observable<any>{
    return this.http.get(`${this.api}/tortenet/${cim}/${this.id.getValue()}`);
  }

  addTortenet(tortenet:any):Observable<any>{
    return this.http.post(`${this.api}/tortenetek/${this.id.getValue()}`,tortenet);
  }

  updateFiokById(fiok:any):Observable<any>{
    return this.http.put(`${this.api}/fiokok/${this.id.getValue()}`,fiok);
  }

  updateTortenetByTortenetId(tortenet:FormData,tortenet_id:number):Observable<any>{
    tortenet.set("fiok_id",this.id.getValue());
    return this.http.put(`${this.api}/tortenetek/${tortenet_id}`,tortenet);
  }

  deleteFiokById():Observable<any>{
    return this.http.delete(`${this.api}/fiokok/${this.id.getValue()}`);
  }
}

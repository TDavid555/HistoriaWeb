import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TortenetekService {
  private api="http://localhost:3000/api";
  constructor(private http:HttpClient) { }
  getTortenetekByTelepules(telepules:string):Observable<any>{
    return this.http.get(`${this.api}/tortenet/${telepules}`);
  }
  
  getTortenetByTortenetId(id:number):Observable<any>{
    return this.http.get(`${this.api}/tortenet/telepules/${id}`);
  }

  getTortenetekOrderByLikes():Observable<any>{
    return this.http.get(`${this.api}/tortenetek/likes`);
  }

  getTortenetekOrderByDate():Observable<any>{
    return this.http.get(`${this.api}/tortenetek`);
  }

  updateLike(like:any){
    return this.http.put(`${this.api}/like`,like);
  }

  deleteTortenetByTortenetId(id:number):Observable<any>{
    return this.http.delete(`${this.api}/tortenetek/${id}`);
  }

  getOsszesTortenetek():Observable<any>{
    return this.http.get(`${this.api}/osszes`);
  }

  getLike(tortenet_id:number,fiok_id:number):Observable<any>{
    return this.http.get(`${this.api}/like/${tortenet_id}/${fiok_id}`);
  }

  addLike(like:any):Observable<any>{
    return this.http.post(`${this.api}/like`,like);
  }

  addHozzaszolas(hozzaszolas:string,tortenet_id:number,fiok_id:number){
    return this.http.post(`${this.api}/hozzaszolas`,{fiok_id:fiok_id,tortenet_id:tortenet_id,hozzaszolas:hozzaszolas});
  }

  deleteLike(tortenet_id:number,fiok_id:number):Observable<any>{
    return this.http.delete(`${this.api}/like/${fiok_id}/${tortenet_id}`);
  }
}

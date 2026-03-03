import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TerkepService {
  private api="http://localhost:3000/api/terkep";
  constructor(private http:HttpClient) { }
  getTerkep():Observable<any>{
    return this.http.get(this.api);
  }
}

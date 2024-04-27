import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppUserService {
   
  url=environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  login(data:any){
    return this.httpClient.post(this.url+
       "/appuser/login",data,{
        headers:new HttpHeaders().set('Content-Type',"application/json")
       }
    )
  }
}

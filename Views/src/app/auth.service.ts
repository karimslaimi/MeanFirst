import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';

import {WebRequestService} from './web-request.service';
import {Router} from '@angular/router';
import {shareReplay, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private services:WebRequestService, private router:Router) { }


  login(email:string,password:string){

    console.log("login service");
    return this.services.login(email,password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response
        this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
        console.log("LOGGED IN!");
      })
    )
  }


  logout(){
    this.removeSession();
    console.log("loggedout")
  }


  getAccessToken(){
    return localStorage.getItem("x-access-item")
  }

  setAccessToken(accesstkn:string){
    localStorage.setItem("x-access-item",accesstkn);
  }

  getRefreshtoken(){
    return localStorage.getItem("x-refresh-token");
  }


  private setSession(userId:string,accesstoken:string,refreshtoken:string){
    localStorage.setItem('userid',userId);
    localStorage.setItem('accesstoken',accesstoken);
    localStorage.setItem('refreshtoken',refreshtoken);
  }
  private removeSession(){
    localStorage.removeItem('userid');
    localStorage.removeItem('accesstoken');
    localStorage.removeItem('refreshtoken');
  }

}

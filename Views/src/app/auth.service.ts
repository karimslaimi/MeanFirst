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

  signup(email:string,password:string){

    console.log("signup service");
    return this.services.signup(email,password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response
        this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
        console.log("Successfully sign up adn now logged in!");
      })
    )
  }


  logout(){
    this.removeSession();
    this.router.navigateByUrl("/login")
    console.log("loggedout")
  }


  getAccessToken(){
    return localStorage.getItem("x-access-token")
  }

  setAccessToken(accesstkn:string){
    localStorage.setItem("x-access-token",accesstkn);
  }

  getRefreshtoken(){
    return localStorage.getItem("x-refresh-token");
  }
  getUserid(){
    return localStorage.getItem("userid");
  }


  private setSession(userId:string,accesstoken:string,refreshtoken:string){
    localStorage.setItem('userid',userId);
    localStorage.setItem('x-access-token',accesstoken);
    localStorage.setItem('x-refresh-token',refreshtoken);
  }
  private removeSession(){
    localStorage.removeItem('userid');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }


  getNewAcessToken(){
    return this.http.get(`${this.services.root_url}/users/me/access-token`,{
      headers:{
        "x-refresh-token":this.getRefreshtoken(),
        "_id":this.getUserid()
      },
      observe:'response'
    }).pipe(tap((res:HttpResponse<any>)=>{
        this.setAccessToken(res.headers.get("x-access-token"));
    }))
  }

}

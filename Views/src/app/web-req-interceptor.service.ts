import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from './auth.service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebReqInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req=this.addAuthHeader(req);
    return next.handle(req).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error);
      return throwError(error);
    }));
  }


  addAuthHeader(request : HttpRequest<any>){
  const token=this.Authservice.getAccessToken();
  if(token){
    return request.clone({
      setHeaders:{
        'x-access-token':token
      }
    })
  }
  return request;
  }


  constructor(private Authservice:AuthService) { }
}
